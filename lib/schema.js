/*jshint latedef:false*/
import utils from './utils';
import defaultRules from './rules';

let hasObject = v => {
  var has = false;
  utils.forOwn(v, _v => {
    if (utils.isObject(_v)) {
      has = true;
      return false;
    }
  });
  return has;
};

function _executeRulesSync(targetKey, options, errors, value, key) {
  let nestedKey = targetKey + (targetKey.length ? '.' : '') + key;
  let schemaRules = utils.get(this.schema, nestedKey);

  if (!schemaRules) {
    return;
  } else if (utils.isObject(value) || hasObject(schemaRules)) {
    let err = _validateSync.apply(this, [nestedKey, value || {}, options]);
    if (err) {
      errors[key] = err;
    }
  } else {
    if (!utils.isObject(schemaRules)) {
      return;
    } else if (schemaRules.nullable === true) {
      let nullable = this.parent.rules.nullable || defaultRules.nullable;
      let nErr = nullable.call(options.ctx, value, true, undefined, this.parent);

      if (nErr === null) {
        return;
      }
    }
    utils.forOwn(schemaRules, (ruleValue, ruleKey) => {
      let rule = this.parent.rules[ruleKey] || defaultRules[ruleKey];
      if (rule && !rule.async) {
        let err = rule.call(options.ctx, value, ruleValue, undefined, this.parent);
        if (err) {
          if (!errors[key]) {
            errors[key] = {
              errors: []
            };
          }
          errors[key].errors.push(err);
        }
      }
    });
  }
}

/**
 * @see Schema#validateSync
 */
function _validateSync(targetKey, attrs, options) {
  let errors = {};

  try {
    // Validate present attributes
    utils.forOwn(attrs, (value, key) => {
      _executeRulesSync.call(this, targetKey, options, errors, value, key);
    });
    // Validate missing attributes
    if (!options.ignoreMissing) {
      let schema = targetKey ? utils.get(this.schema, targetKey) || {} : this.schema;
      let missing = utils.difference(utils.keys(schema), utils.keys(attrs));
      missing = utils.pick(this.schema, missing);
      missing = utils.map(missing, () => undefined);
      utils.forOwn(missing, (value, key) => {
        _executeRulesSync.call(this, targetKey, options, errors, value, key);
      });
    }
    if (!utils.isEmpty(errors)) {
      return errors;
    } else {
      return null;
    }
  } catch (err) {
    return err;
  }
}

function _executeRules(options, value, key, prefix, errors, deepQueue, ruleQueue) {
  let nestedKey = prefix + key;
  let schemaRules = utils.get(this.schema, nestedKey);

  if (!schemaRules) {
    return;
  } else if (utils.isObject(value) || hasObject(schemaRules)) {
    // Recurse down into nested attributes
    deepQueue[key] = ((nK, val) => {
      return next => {
        _validate.apply(this, [nK, val || {}, options, next]);
      };
    })(nestedKey, value);
  } else {
    if (!utils.isObject(schemaRules)) {
      return;
    } else if (schemaRules.nullable === true) {
      let nullable = this.parent.rules.nullable || defaultRules.nullable;
      let nErr = nullable.call(options.ctx, value, true, undefined, this.parent);

      if (nErr === null) {
        return;
      }
    }
    utils.forOwn(schemaRules, (ruleValue, ruleKey) => {
      let rule = this.parent.rules[ruleKey] || defaultRules[ruleKey];
      // Asynchronous rules get added to the queue
      if (rule && rule.async) {
        ruleQueue[`${ruleKey}_${ruleValue}`] = ((r, key, val, rVal) => {
          return next => {
            r.call(options.ctx, val, rVal, err => {
              next(null, { err: err, key: key });
            });
          };
        })(rule, key, value, ruleValue);
      } else {
        // Get results of synchronous rules immediately
        let err = rule.call(options.ctx, value, ruleValue, undefined, this.parent);
        if (err) {
          if (!errors[key]) {
            errors[key] = {
              errors: []
            };
          }
          errors[key].errors.push(err);
        }
      }
    });
  }
}

/**
 * @see Schema#validate
 */
function _validate(targetKey, attrs, options, cb) {
  let errors = {};
  let prefix = targetKey + (targetKey.length ? '.' : '');
  let deepQueue = {};
  let ruleQueue = {};
  let first = options.first;

  delete options.first;

  utils.forOwn(attrs, (value, key) => {
    _executeRules.call(this, options, value, key, prefix, errors, deepQueue, ruleQueue);
  });

  // Validate missing attributes
  if (!options.ignoreMissing) {
    let schema = targetKey ? utils.get(this.schema, targetKey) || {} : this.schema;
    let missing = utils.difference(utils.keys(schema), utils.keys(attrs));

    missing = utils.pick(this.schema, missing);
    missing = utils.map(missing, () => undefined);

    utils.forOwn(missing, (value, key) => {
      _executeRules.call(this, options, value, key, prefix, errors, deepQueue, ruleQueue);
    });
  }

  var finalQueue = {};

  if (!utils.isEmpty(deepQueue)) {
    finalQueue.deepQueue = next => {
      utils.parallel(deepQueue, next);
    };
  }
  if (!utils.isEmpty(ruleQueue)) {
    finalQueue.ruleQueue = next => {
      utils.parallel(ruleQueue, next);
    };
  }

  if (!utils.isEmpty(finalQueue)) {
    utils.parallel(finalQueue, (err, results) => {

      // Merge results of recursion
      if (results.deepQueue) {
        results.deepQueue = utils.filter(results.deepQueue, x => x !== undefined && x !== null);
        utils.deepMixIn(errors, results.deepQueue);
      }

      // Merge results of asynchronous rules
      if (results.ruleQueue) {
        if (results.ruleQueue) {
          results.ruleQueue = utils.filter(results.ruleQueue, x => x.err !== undefined && x.err !== null);
        }
        utils.forOwn(results.ruleQueue, value => {
          if (!errors[value.key]) {
            errors[value.key] = {
              errors: []
            };
          }
          errors[value.key].errors.push(value.err);
        });
      }

      if (!utils.isEmpty(errors)) {
        first ? cb(errors) : cb(null, errors);
      } else {
        cb(null);
      }
    });
  } else {
    if (!utils.isEmpty(errors)) {
      first ? cb(errors) : cb(null, errors);
    } else {
      cb(null);
    }
  }
}

function _validateSchema(attrs, rules) {
  rules = rules || [];
  let keys = utils.keys(attrs);
  let noRules = utils.intersection(keys, rules).length === 0;

  utils.forOwn(attrs, (value, key) => {
    if (noRules && utils.isString(value)) {
      attrs[key] = {
        type: value
      };
    } else if (utils.isObject(value)) {
      _validateSchema(value, rules);
    }
  });
}

let errors = {
  a: 'Schema#validateSync(attrs[, options]): ',
  b: 'Schema#validate(attrs[, options], cb): '
};

class Schema {
  constructor(name, schema, parent) {
    if (!utils.isString(name)) {
      throw new Error('"name" must be a string!');
    } else if (!utils.isObject(schema)) {
      throw new Error('"schema" must be an object!');
    }
    this.name = name;
    _validateSchema(schema, parent ? parent.availableRules() : defaultRules);
    this.schema = schema;
  }

  validateSync(attrs, options) {
    options = options ? (options === true ? { ignoreMissing: true } : options) : {};
    if (!utils.isObject(attrs)) {
      throw new Error(`${errors.a}attrs: Must be an object!`);
    } else if (!utils.isObject(options)) {
      throw new Error(`${errors.a}options: Must be an object!`);
    }
    options.ctx = attrs;
    return _validateSync.call(this, '', attrs, options);
  }

  validate(attrs, options, cb) {
    options = options ? (options === true ? { ignoreMissing: true } : options) : {};
    if (utils.isFunction(options)) {
      cb = options;
      options = {};
    }
    if (!utils.isFunction(cb)) {
      throw new Error(`${errors.b}cb: Must be a function!`);
    } else if (!utils.isObject(attrs)) {
      return cb(new Error(`${errors.b}attrs: Must be an object!`));
    } else if (!utils.isObject(options)) {
      return cb(new Error(`${errors.b}options: Must be an object!`));
    }
    options.first = true;
    options.ctx = attrs;
    _validate.call(this, '', attrs, options, cb);
  }

  addDefaultsToTarget(target, overwrite) {
    if (!utils.isObject(target)) {
      throw new Error('"target" must be an object!');
    } else if (!this.defaults) {
      throw new Error('No defaults have been set!');
    } else if (overwrite) {
      utils.deepMixIn(target, this.defaults);
    } else {
      utils.deepFillIn(target, this.defaults);
    }
  }

  setDefaults(attrs) {
    if (!utils.isObject(attrs)) {
      throw new Error('Schema#defaults(attrs): attrs: Must be an object!');
    } else {
      this.defaults = utils.merge({}, attrs);
    }
    return this;
  }

  getDefaults() {
    return utils.merge({}, this.defaults);
  }

  stripNonSchemaAttrs(attrs) {
    _stripNonSchemaAttrs(attrs, this.schema);
    return attrs;
  }
}

function _stripNonSchemaAttrs(attrs, schemaLevel) {
  utils.forOwn(attrs, (value, key) => {
    if (schemaLevel[key]) {
      if (utils.isObject(value) && utils.isObject(schemaLevel[key])) {
        _stripNonSchemaAttrs(value, schemaLevel[key]);
      }
    } else {
      utils.unset(attrs, key);
    }
  });
}

export default Schema;
