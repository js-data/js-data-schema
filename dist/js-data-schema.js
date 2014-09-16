!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.Schemator=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var utils = require('./utils');

module.exports = {
  string: function (x) {
    return utils.isString(x) ? null : utils.errMsg('type', typeof x, 'string');
  },
  number: function (x) {
    return utils.isNumber(x) ? null : utils.errMsg('type', typeof x, 'number');
  },
  integer: function (x) {
    if (!utils.isNumber(x)) {
      return utils.errMsg('type', typeof x, 'integer');
    } else if (Math.abs(x) - Math.abs(utils.toInt(x)) !== 0) {
      return utils.errMsg('type', 'real', 'integer');
    } else {
      return null;
    }
  },
  float: function (x) {
    return utils.isNumber(x) ? null : utils.errMsg('type', typeof x, 'float');
  },
  array: function (x) {
    return utils.isArray(x) ? null : utils.errMsg('type', typeof x, 'array');
  },
  object: function (x) {
    return utils.isObject(x) ? null : utils.errMsg('type', typeof x, 'object');
  },
  boolean: function (x) {
    return utils.isBoolean(x) ? null : utils.errMsg('type', typeof x, 'boolean');
  },
  date: function (x) {
    return utils.isDate(x) ? null : utils.errMsg('type', typeof x, 'date');
  }
};

},{"./utils":5}],2:[function(require,module,exports){
'use strict';

var utils = require('./utils');
var defaultDataTypes = require('./dataTypes');
var defaultRules = require('./rules');
var Schema = require('./schema');
var id = 1;

function Schemator() {
  this.dataTypes = {};
  this.rules = {};
  this.schemata = {};
  this.id = id++;
}

var schematorPrototype = Schemator.prototype;

schematorPrototype.availableDataTypes = function () {
  return utils.unique(utils.keys(this.dataTypes).concat(utils.keys(defaultDataTypes)));
};

schematorPrototype.availableRules = function () {
  return utils.unique(utils.keys(this.rules).concat(utils.keys(defaultRules)));
};

schematorPrototype.availableSchemata = function () {
  return utils.keys(this.schemata);
};

schematorPrototype.defineDataType = function (name, typeDefinition) {
  if (!utils.isString(name)) {
    throw new Error('"name" must be a string!');
  } else if (!utils.isFunction(typeDefinition)) {
    throw new Error('"typeDefinition" must be a function!');
  } else if (this.dataTypes[name]) {
    throw new Error('dataType already registered!');
  }
  this.dataTypes[name] = typeDefinition;
};

schematorPrototype.defineRule = function (name, ruleFunc, async) {
  if (!utils.isString(name)) {
    throw new Error('"name" must be a string!');
  } else if (!utils.isFunction(ruleFunc)) {
    throw new Error('"ruleFunc" must be a function!');
  } else if (this.rules[name]) {
    throw new Error('rule already registered!');
  }
  this.rules[name] = ruleFunc;
  this.rules[name].async = !!async;
};

schematorPrototype.defineSchema = function (name, schema) {
  if (this.schemata[name]) {
    throw new Error('schema already registered!');
  } else if (schema instanceof Schema) {
    throw new Error('schema registered elsewhere!');
  }
  this.schemata[name] = new Schema(name, schema, this);
  this.schemata[name].parent = this;
  return this.schemata[name];
};

schematorPrototype.getDataType = function (name) {
  return this.dataTypes[name] || defaultDataTypes[name];
};

schematorPrototype.getRule = function (name) {
  return this.rules[name] || defaultRules[name];
};

schematorPrototype.getSchema = function (name) {
  return this.schemata[name];
};

schematorPrototype.removeDataType = function (name) {
  delete this.dataTypes[name];
};

schematorPrototype.removeRule = function (name) {
  delete this.rules[name];
};

schematorPrototype.removeSchema = function (name) {
  delete this.schemata[name];
};

utils.forOwn(Schema.prototype, function (value, key) {
  if (typeof value === 'function') {
    schematorPrototype[key] = function (name) {
      if (!this.schemata[name]) {
        throw new Error('schema is not registered!');
      }
      var args = Array.prototype.slice.call(arguments);
      args.shift();
      return value.apply(this.schemata[name], args);
    };
  }
});

module.exports = Schemator;

},{"./dataTypes":1,"./rules":3,"./schema":4,"./utils":5}],3:[function(require,module,exports){
'use strict';

var utils = require('./utils');
var defaultDataTypes = require('./dataTypes');

module.exports = {
  nullable: function (x, nullable) {
    return (x === null || x === undefined) && !nullable ? utils.errMsg('nullable', 'x === ' + x, 'x !== null && x !== undefined') : null;
  },
  max: function (x, max) {
    return utils.isNumber(x) && utils.isNumber(max) && x > max ? utils.errMsg('max', '' + x + ' > ' + max, '' + x + ' <= ' + max) : null;
  },
  min: function (x, min) {
    return utils.isNumber(x) && utils.isNumber(min) && x < min ? utils.errMsg('min', '' + x + ' < ' + min, '' + x + ' >= ' + min) : null;
  },
  maxLength: function (x, maxLength) {
    return (utils.isString(x) || utils.isArray(x)) && utils.isNumber(maxLength) && x.length > maxLength ? utils.errMsg('maxLength', '' + x.length + ' > ' + maxLength, '' + x.length + ' <= ' + maxLength) : null;
  },
  minLength: function (x, minLength) {
    return (utils.isString(x) || utils.isArray(x)) && utils.isNumber(minLength) && x.length < minLength ? utils.errMsg('minLength', '' + x.length + ' < ' + minLength, '' + x.length + ' >= ' + minLength) : null;
  },
  type: function (x, type, customType) {
    return customType ? customType(x) : defaultDataTypes[type] ? defaultDataTypes[type](x) : null;
  }
};

},{"./dataTypes":1,"./utils":5}],4:[function(require,module,exports){
/*jshint latedef:false*/
'use strict';

var utils = require('./utils');
var defaultRules = require('./rules');

function _executeRulesSync(targetKey, options, errors, value, key) {
  var _this = this;
  var nestedKey = targetKey + (targetKey.length ? '.' : '') + key;

  if (utils.isObject(value)) {
    var err = _validateSync.apply(_this, [nestedKey, value, options]);
    if (err) {
      errors[key] = err;
    }
  } else {
    var schemaRules = utils.get(_this.schema, nestedKey);
    if (!utils.isObject(schemaRules)) {
      return;
    } else if (schemaRules.nullable === true) {
      var nullable = this.parent.rules.nullable || defaultRules.nullable;
      var nErr = nullable(value, true);

      if (nErr === null) {
        return;
      }
    }
    utils.forOwn(schemaRules, function (ruleValue, ruleKey) {
      var rule = _this.parent.rules[ruleKey] || defaultRules[ruleKey];
      if (!rule.async) {
        var err = rule(value, ruleValue);
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
  var errors = {},
    _this = this;

  try {
    // Validate present attributes
    utils.forOwn(attrs, function (value, key) {
      _executeRulesSync.call(_this, targetKey, options, errors, value, key);
    });
    // Validate missing attributes
    if (!options.ignoreMissing) {
      var schema = targetKey ? utils.get(_this.schema, targetKey) || {} : _this.schema;
      var missing = utils.difference(utils.keys(schema), utils.keys(attrs));
      missing = utils.pick(this.schema, missing);
      missing = utils.map(missing, function () {
        return undefined;
      });
      utils.forOwn(missing, function (value, key) {
        _executeRulesSync.call(_this, targetKey, options, errors, value, key);
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
  var _this = this,
    nestedKey = prefix + key;

  if (utils.isObject(value)) {
    // Recurse down into nested attributes
    deepQueue[key] = (function (nK, val) {
      return function (next) {
        _validate.apply(_this, [nK, val, options, next]);
      };
    })(nestedKey, value);
  } else {
    var schemaRules = utils.get(_this.schema, nestedKey);
    if (!utils.isObject(schemaRules)) {
      return;
    } else if (schemaRules.nullable === true) {
      var nullable = this.parent.rules.nullable || defaultRules.nullable,
        nErr = nullable(value, true);

      if (nErr === null) {
        return;
      }
    }
    utils.forOwn(schemaRules, function (ruleValue, ruleKey) {
      var rule = _this.parent.rules[ruleKey] || defaultRules[ruleKey];
      // Asynchronous rules get added to the queue
      if (rule.async) {
        ruleQueue[ruleKey] = (function (r, key, val, rVal) {
          return function (next) {
            r(val, rVal, function (err) {
              next(null, { err: err, key: key });
            });
          };
        })(rule, key, value, ruleValue);
      } else {
        // Get results of synchronous rules immediately
        var err = rule(value, ruleValue);
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
  var errors = {},
    _this = this,
    prefix = targetKey + (targetKey.length ? '.' : ''),
    deepQueue = {},
    ruleQueue = {},
    first = options.first;

  delete options.first;

  utils.forOwn(attrs, function (value, key) {
    _executeRules.call(_this, options, value, key, prefix, errors, deepQueue, ruleQueue);
  });

  // Validate missing attributes
  if (!options.ignoreMissing) {
    var schema = targetKey ? utils.get(_this.schema, targetKey) || {} : _this.schema,
      missing = utils.difference(utils.keys(schema), utils.keys(attrs));

    missing = utils.pick(this.schema, missing);
    missing = utils.map(missing, function () {
      return undefined;
    });

    utils.forOwn(missing, function (value, key) {
      _executeRules.call(_this, options, value, key, prefix, errors, deepQueue, ruleQueue);
    });
  }

  var finalQueue = {};

  if (!utils.isEmpty(deepQueue)) {
    finalQueue.deepQueue = function (next) {
      utils.parallel(deepQueue, next);
    };
  }
  if (!utils.isEmpty(ruleQueue)) {
    finalQueue.ruleQueue = function (next) {
      utils.parallel(ruleQueue, next);
    };
  }

  if (!utils.isEmpty(finalQueue)) {
    utils.parallel(finalQueue, function (err, results) {

      // Merge results of recursion
      if (results.deepQueue) {
        results.deepQueue = utils.filter(results.deepQueue, function (x) {
          return x !== undefined && x !== null;
        });
        utils.deepMixIn(errors, results.deepQueue);
      }

      // Merge results of asynchronous rules
      if (results.ruleQueue) {
        if (results.ruleQueue) {
          results.ruleQueue = utils.filter(results.ruleQueue, function (x) {
            return x.err !== undefined && x.err !== null;
          });
        }
        utils.forOwn(results.ruleQueue, function (value) {
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
  var keys = utils.keys(attrs);
  var noRules = utils.intersection(keys, rules).length === 0;

  utils.forOwn(attrs, function (value, key) {
    if (noRules && utils.isString(value)) {
      attrs[key] = {
        type: value
      };
    } else if (utils.isObject(value)) {
      if (utils.contains(rules, key)) {
        throw new Error('Rule configuration for rule "' + key + '" cannot be an object!');
      } else {
        _validateSchema(value, rules);
      }
    }
  });
}

function Schema(name, schema, parent) {
  if (!utils.isString(name)) {
    throw new Error('"name" must be a string!');
  } else if (!utils.isObject(schema)) {
    throw new Error('"schema" must be an object!');
  }
  this.name = name;
  _validateSchema(schema, parent ? parent.availableRules() : defaultRules);
  this.schema = schema;
}

var schemaPrototype = Schema.prototype;

/**
 * @method Schema#validateSync
 * @desc Validate (synchronously) the given attributes against this Schema instance.
 * @param {object} attrs The attributes to validate.
 * @param {object} [options={}] Optional configuration.
 * @property {boolean} [options.ignoreMissing=false] If true this method will ignore validation for defined schema
 * properties that don't appear in the given hash of attributes. This is useful for validating incremental updates to an
 * object, when you don't have the full attributes of the object (client-side validation).
 * @returns {object|null} Null if validation succeeds or an error object if validation fails.
 */
schemaPrototype.validateSync = function (attrs, options) {
  options = options ? (options === true ? { ignoreMissing: true } : options) : {};
  if (!utils.isObject(attrs)) {
    throw new Error('Schema#validateSync(attrs[, options]): attrs: Must be an object!');
  } else if (!utils.isObject(options)) {
    throw new Error('Schema#validateSync(attrs[, options]): options: Must be an object!');
  }
  return _validateSync.apply(this, ['', attrs, options]);
};

/**
 * @method Schema#validate
 * @desc Validate the given attributes against this Schema instance.
 * @param {object} attrs The attributes to validate.
 * @param {object} [options={}] Optional configuration.
 * @property {boolean} [options.ignoreMissing=false] If true this method will ignore validation for defined schema
 * properties that don't appear in the given hash of attributes. This is useful for validating incremental updates to an
 * object, when you don't have the full attributes of the object (client-side validation).
 * @param {function} cb Callback function. Will receive no arguments if validation succeeds and an error object if
 * validation fails.
 */
schemaPrototype.validate = function (attrs, options, cb) {
  options = options ? (options === true ? { ignoreMissing: true } : options) : {};
  if (utils.isFunction(options)) {
    cb = options;
    options = {};
  }
  if (!utils.isFunction(cb)) {
    throw new Error('Schema#validate(attrs[, options], cb): cb: Must be a function!');
  } else if (!utils.isObject(attrs)) {
    return cb(new Error('Schema#validate(attrs[, options], cb): attrs: Must be an object!'));
  } else if (!utils.isObject(options)) {
    return cb(new Error('Schema#validate(attrs[, options], cb): options: Must be an object!'));
  }
  options.first = true;
  _validate.apply(this, ['', attrs, options, cb]);
};

/**
 * @method Schema#addDefaultsToTarget
 * @desc Add the default values for this Schema to the target object.
 * @param {object} target The target object to which to add the defaults.
 * rules.
 * @param {boolean=} overwrite Whether to overwrite existing values with the default values. Default: `false`.
 * @returns {object} The target with defaults merged in.
 */
schemaPrototype.addDefaultsToTarget = function (target, overwrite) {
  if (!utils.isObject(target)) {
    throw new Error('"target" must be an object!');
  } else if (!this.defaults) {
    throw new Error('No defaults have been set!');
  } else if (overwrite) {
    utils.deepMixIn(target, this.defaults);
  } else {
    utils.deepFillIn(target, this.defaults);
  }
};

/**
 * @method Schema#setDefaults
 * @desc Set the default values for this Schema.
 * @param {object} attrs The default values for an object of this Schema.
 * @returns {Schema} Reference to this schema.
 */
schemaPrototype.setDefaults = function (attrs) {
  if (!utils.isObject(attrs)) {
    throw new Error('Schema#defaults(attrs): attrs: Must be an object!');
  } else {
    this.defaults = utils.merge({}, attrs);
  }
  return this;
};

/**
 * @method Schema#getDefaults
 * @desc Get the default values for this Schema.
 * @returns {object} The default values for this schema.
 */
schemaPrototype.getDefaults = function () {
  return utils.merge({}, this.defaults);
};

function stripNonSchemaAttrs(attrs, schemaLevel) {
  utils.forOwn(attrs, function (value, key) {
    if (schemaLevel[key]) {
      if (utils.isObject(value) && utils.isObject(schemaLevel[key])) {
        stripNonSchemaAttrs(value, schemaLevel[key]);
      }
    } else {
      utils.unset(attrs, key);
    }
  });
}

/**
 * @method Schema#stripNonSchemaAttrs
 * @desc Strip fields not defined in this schema from the given attributes.
 * @returns {object} The attributes from which to strip non-schema fields.
 */
schemaPrototype.stripNonSchemaAttrs = function (attrs) {
  stripNonSchemaAttrs(attrs, this.schema);
  return attrs;
};

module.exports = Schema;

},{"./rules":3,"./utils":5}],5:[function(require,module,exports){
'use strict';

module.exports = {
  isString: require('mout/lang/isString'),
  isBoolean: require('mout/lang/isBoolean'),
  isNumber: require('mout/lang/isNumber'),
  isObject: require('mout/lang/isObject'),
  isDate: require('mout/lang/isDate'),
  isFunction: require('mout/lang/isFunction'),
  isUndefined: require('mout/lang/isUndefined'),
  isArray: require('mout/lang/isArray'),
  isEmpty: require('mout/lang/isEmpty'),
  toString: require('mout/lang/toString'),
  toNumber: require('mout/lang/toNumber'),

  get: require('mout/object/get'),
  deepMixIn: require('mout/object/deepMixIn'),
  deepFillIn: require('mout/object/deepFillIn'),
  forOwn: require('mout/object/forOwn'),
  keys: require('mout/object/keys'),
  pick: require('mout/object/pick'),
  filter: require('mout/object/filter'),
  map: require('mout/object/map'),
  merge: require('mout/object/merge'),
  unset: require('mout/object/unset'),

  contains: require('mout/array/contains'),
  intersection: require('mout/array/intersection'),
  difference: require('mout/array/difference'),
  unique: require('mout/array/unique'),

  toInt: require('mout/number/toInt'),

  errMsg: function (rule, actual, expected) {
    return {
      rule: rule,
      actual: actual,
      expected: expected
    };
  },

  parallel: function (tasks, cb) {
    var results = {};
    var completed = 0;
    var length = 0;

    this.forOwn(tasks, function () {
      length += 1;
    });


    this.forOwn(tasks, function (task, key) {
      task(function (err) {
        var args = Array.prototype.slice.call(arguments, 1);
        if (args.length <= 1) {
          args = args[0];
        }
        results[key] = args;
        done(err);
      });
    });

    function done(err) {
      completed += 1;
      if (err || completed >= length) {
        cb(err, results);
      }
    }
  }
};

},{"mout/array/contains":6,"mout/array/difference":7,"mout/array/intersection":11,"mout/array/unique":14,"mout/lang/isArray":20,"mout/lang/isBoolean":21,"mout/lang/isDate":22,"mout/lang/isEmpty":23,"mout/lang/isFunction":24,"mout/lang/isNumber":26,"mout/lang/isObject":27,"mout/lang/isString":30,"mout/lang/isUndefined":31,"mout/lang/toNumber":33,"mout/lang/toString":34,"mout/number/toInt":35,"mout/object/deepFillIn":36,"mout/object/deepMixIn":38,"mout/object/filter":39,"mout/object/forOwn":41,"mout/object/get":42,"mout/object/keys":45,"mout/object/map":46,"mout/object/merge":47,"mout/object/pick":49,"mout/object/unset":50}],6:[function(require,module,exports){
var indexOf = require('./indexOf');

    /**
     * If array contains values.
     */
    function contains(arr, val) {
        return indexOf(arr, val) !== -1;
    }
    module.exports = contains;


},{"./indexOf":10}],7:[function(require,module,exports){
var unique = require('./unique');
var filter = require('./filter');
var some = require('./some');
var contains = require('./contains');
var slice = require('./slice');


    /**
     * Return a new Array with elements that aren't present in the other Arrays.
     */
    function difference(arr) {
        var arrs = slice(arguments, 1),
            result = filter(unique(arr), function(needle){
                return !some(arrs, function(haystack){
                    return contains(haystack, needle);
                });
            });
        return result;
    }

    module.exports = difference;



},{"./contains":6,"./filter":9,"./slice":12,"./some":13,"./unique":14}],8:[function(require,module,exports){
var makeIterator = require('../function/makeIterator_');

    /**
     * Array every
     */
    function every(arr, callback, thisObj) {
        callback = makeIterator(callback, thisObj);
        var result = true;
        if (arr == null) {
            return result;
        }

        var i = -1, len = arr.length;
        while (++i < len) {
            // we iterate over sparse items since there is no way to make it
            // work properly on IE 7-8. see #64
            if (!callback(arr[i], i, arr) ) {
                result = false;
                break;
            }
        }

        return result;
    }

    module.exports = every;


},{"../function/makeIterator_":16}],9:[function(require,module,exports){
var makeIterator = require('../function/makeIterator_');

    /**
     * Array filter
     */
    function filter(arr, callback, thisObj) {
        callback = makeIterator(callback, thisObj);
        var results = [];
        if (arr == null) {
            return results;
        }

        var i = -1, len = arr.length, value;
        while (++i < len) {
            value = arr[i];
            if (callback(value, i, arr)) {
                results.push(value);
            }
        }

        return results;
    }

    module.exports = filter;



},{"../function/makeIterator_":16}],10:[function(require,module,exports){


    /**
     * Array.indexOf
     */
    function indexOf(arr, item, fromIndex) {
        fromIndex = fromIndex || 0;
        if (arr == null) {
            return -1;
        }

        var len = arr.length,
            i = fromIndex < 0 ? len + fromIndex : fromIndex;
        while (i < len) {
            // we iterate over sparse items since there is no way to make it
            // work properly on IE 7-8. see #64
            if (arr[i] === item) {
                return i;
            }

            i++;
        }

        return -1;
    }

    module.exports = indexOf;


},{}],11:[function(require,module,exports){
var unique = require('./unique');
var filter = require('./filter');
var every = require('./every');
var contains = require('./contains');
var slice = require('./slice');


    /**
     * Return a new Array with elements common to all Arrays.
     * - based on underscore.js implementation
     */
    function intersection(arr) {
        var arrs = slice(arguments, 1),
            result = filter(unique(arr), function(needle){
                return every(arrs, function(haystack){
                    return contains(haystack, needle);
                });
            });
        return result;
    }

    module.exports = intersection;



},{"./contains":6,"./every":8,"./filter":9,"./slice":12,"./unique":14}],12:[function(require,module,exports){


    /**
     * Create slice of source array or array-like object
     */
    function slice(arr, start, end){
        var len = arr.length;

        if (start == null) {
            start = 0;
        } else if (start < 0) {
            start = Math.max(len + start, 0);
        } else {
            start = Math.min(start, len);
        }

        if (end == null) {
            end = len;
        } else if (end < 0) {
            end = Math.max(len + end, 0);
        } else {
            end = Math.min(end, len);
        }

        var result = [];
        while (start < end) {
            result.push(arr[start++]);
        }

        return result;
    }

    module.exports = slice;



},{}],13:[function(require,module,exports){
var makeIterator = require('../function/makeIterator_');

    /**
     * Array some
     */
    function some(arr, callback, thisObj) {
        callback = makeIterator(callback, thisObj);
        var result = false;
        if (arr == null) {
            return result;
        }

        var i = -1, len = arr.length;
        while (++i < len) {
            // we iterate over sparse items since there is no way to make it
            // work properly on IE 7-8. see #64
            if ( callback(arr[i], i, arr) ) {
                result = true;
                break;
            }
        }

        return result;
    }

    module.exports = some;


},{"../function/makeIterator_":16}],14:[function(require,module,exports){
var filter = require('./filter');

    /**
     * @return {array} Array of unique items
     */
    function unique(arr, compare){
        compare = compare || isEqual;
        return filter(arr, function(item, i, arr){
            var n = arr.length;
            while (++i < n) {
                if ( compare(item, arr[i]) ) {
                    return false;
                }
            }
            return true;
        });
    }

    function isEqual(a, b){
        return a === b;
    }

    module.exports = unique;



},{"./filter":9}],15:[function(require,module,exports){


    /**
     * Returns the first argument provided to it.
     */
    function identity(val){
        return val;
    }

    module.exports = identity;



},{}],16:[function(require,module,exports){
var identity = require('./identity');
var prop = require('./prop');
var deepMatches = require('../object/deepMatches');

    /**
     * Converts argument into a valid iterator.
     * Used internally on most array/object/collection methods that receives a
     * callback/iterator providing a shortcut syntax.
     */
    function makeIterator(src, thisObj){
        if (src == null) {
            return identity;
        }
        switch(typeof src) {
            case 'function':
                // function is the first to improve perf (most common case)
                // also avoid using `Function#call` if not needed, which boosts
                // perf a lot in some cases
                return (typeof thisObj !== 'undefined')? function(val, i, arr){
                    return src.call(thisObj, val, i, arr);
                } : src;
            case 'object':
                return function(val){
                    return deepMatches(val, src);
                };
            case 'string':
            case 'number':
                return prop(src);
        }
    }

    module.exports = makeIterator;



},{"../object/deepMatches":37,"./identity":15,"./prop":17}],17:[function(require,module,exports){


    /**
     * Returns a function that gets a property of the passed object
     */
    function prop(name){
        return function(obj){
            return obj[name];
        };
    }

    module.exports = prop;



},{}],18:[function(require,module,exports){
var kindOf = require('./kindOf');
var isPlainObject = require('./isPlainObject');
var mixIn = require('../object/mixIn');

    /**
     * Clone native types.
     */
    function clone(val){
        switch (kindOf(val)) {
            case 'Object':
                return cloneObject(val);
            case 'Array':
                return cloneArray(val);
            case 'RegExp':
                return cloneRegExp(val);
            case 'Date':
                return cloneDate(val);
            default:
                return val;
        }
    }

    function cloneObject(source) {
        if (isPlainObject(source)) {
            return mixIn({}, source);
        } else {
            return source;
        }
    }

    function cloneRegExp(r) {
        var flags = '';
        flags += r.multiline ? 'm' : '';
        flags += r.global ? 'g' : '';
        flags += r.ignorecase ? 'i' : '';
        return new RegExp(r.source, flags);
    }

    function cloneDate(date) {
        return new Date(+date);
    }

    function cloneArray(arr) {
        return arr.slice();
    }

    module.exports = clone;



},{"../object/mixIn":48,"./isPlainObject":28,"./kindOf":32}],19:[function(require,module,exports){
var clone = require('./clone');
var forOwn = require('../object/forOwn');
var kindOf = require('./kindOf');
var isPlainObject = require('./isPlainObject');

    /**
     * Recursively clone native types.
     */
    function deepClone(val, instanceClone) {
        switch ( kindOf(val) ) {
            case 'Object':
                return cloneObject(val, instanceClone);
            case 'Array':
                return cloneArray(val, instanceClone);
            default:
                return clone(val);
        }
    }

    function cloneObject(source, instanceClone) {
        if (isPlainObject(source)) {
            var out = {};
            forOwn(source, function(val, key) {
                this[key] = deepClone(val, instanceClone);
            }, out);
            return out;
        } else if (instanceClone) {
            return instanceClone(source);
        } else {
            return source;
        }
    }

    function cloneArray(arr, instanceClone) {
        var out = [],
            i = -1,
            n = arr.length,
            val;
        while (++i < n) {
            out[i] = deepClone(arr[i], instanceClone);
        }
        return out;
    }

    module.exports = deepClone;




},{"../object/forOwn":41,"./clone":18,"./isPlainObject":28,"./kindOf":32}],20:[function(require,module,exports){
var isKind = require('./isKind');
    /**
     */
    var isArray = Array.isArray || function (val) {
        return isKind(val, 'Array');
    };
    module.exports = isArray;


},{"./isKind":25}],21:[function(require,module,exports){
var isKind = require('./isKind');
    /**
     */
    function isBoolean(val) {
        return isKind(val, 'Boolean');
    }
    module.exports = isBoolean;


},{"./isKind":25}],22:[function(require,module,exports){
var isKind = require('./isKind');
    /**
     */
    function isDate(val) {
        return isKind(val, 'Date');
    }
    module.exports = isDate;


},{"./isKind":25}],23:[function(require,module,exports){
var forOwn = require('../object/forOwn');
var isArray = require('./isArray');

    function isEmpty(val){
        if (val == null) {
            // typeof null == 'object' so we check it first
            return true;
        } else if ( typeof val === 'string' || isArray(val) ) {
            return !val.length;
        } else if ( typeof val === 'object' ) {
            var result = true;
            forOwn(val, function(){
                result = false;
                return false; // break loop
            });
            return result;
        } else {
            return true;
        }
    }

    module.exports = isEmpty;



},{"../object/forOwn":41,"./isArray":20}],24:[function(require,module,exports){
var isKind = require('./isKind');
    /**
     */
    function isFunction(val) {
        return isKind(val, 'Function');
    }
    module.exports = isFunction;


},{"./isKind":25}],25:[function(require,module,exports){
var kindOf = require('./kindOf');
    /**
     * Check if value is from a specific "kind".
     */
    function isKind(val, kind){
        return kindOf(val) === kind;
    }
    module.exports = isKind;


},{"./kindOf":32}],26:[function(require,module,exports){
var isKind = require('./isKind');
    /**
     */
    function isNumber(val) {
        return isKind(val, 'Number');
    }
    module.exports = isNumber;


},{"./isKind":25}],27:[function(require,module,exports){
var isKind = require('./isKind');
    /**
     */
    function isObject(val) {
        return isKind(val, 'Object');
    }
    module.exports = isObject;


},{"./isKind":25}],28:[function(require,module,exports){


    /**
     * Checks if the value is created by the `Object` constructor.
     */
    function isPlainObject(value) {
        return (!!value && typeof value === 'object' &&
            value.constructor === Object);
    }

    module.exports = isPlainObject;



},{}],29:[function(require,module,exports){


    /**
     * Checks if the object is a primitive
     */
    function isPrimitive(value) {
        // Using switch fallthrough because it's simple to read and is
        // generally fast: http://jsperf.com/testing-value-is-primitive/5
        switch (typeof value) {
            case "string":
            case "number":
            case "boolean":
                return true;
        }

        return value == null;
    }

    module.exports = isPrimitive;



},{}],30:[function(require,module,exports){
var isKind = require('./isKind');
    /**
     */
    function isString(val) {
        return isKind(val, 'String');
    }
    module.exports = isString;


},{"./isKind":25}],31:[function(require,module,exports){

    var UNDEF;

    /**
     */
    function isUndef(val){
        return val === UNDEF;
    }
    module.exports = isUndef;


},{}],32:[function(require,module,exports){


    var _rKind = /^\[object (.*)\]$/,
        _toString = Object.prototype.toString,
        UNDEF;

    /**
     * Gets the "kind" of value. (e.g. "String", "Number", etc)
     */
    function kindOf(val) {
        if (val === null) {
            return 'Null';
        } else if (val === UNDEF) {
            return 'Undefined';
        } else {
            return _rKind.exec( _toString.call(val) )[1];
        }
    }
    module.exports = kindOf;


},{}],33:[function(require,module,exports){
var isArray = require('./isArray');

    /**
     * covert value into number if numeric
     */
    function toNumber(val){
        // numberic values should come first because of -0
        if (typeof val === 'number') return val;
        // we want all falsy values (besides -0) to return zero to avoid
        // headaches
        if (!val) return 0;
        if (typeof val === 'string') return parseFloat(val);
        // arrays are edge cases. `Number([4]) === 4`
        if (isArray(val)) return NaN;
        return Number(val);
    }

    module.exports = toNumber;



},{"./isArray":20}],34:[function(require,module,exports){


    /**
     * Typecast a value to a String, using an empty string value for null or
     * undefined.
     */
    function toString(val){
        return val == null ? '' : val.toString();
    }

    module.exports = toString;



},{}],35:[function(require,module,exports){


    /**
     * "Convert" value into an 32-bit integer.
     * Works like `Math.floor` if val > 0 and `Math.ceil` if val < 0.
     * IMPORTANT: val will wrap at 2^31 and -2^31.
     * Perf tests: http://jsperf.com/vs-vs-parseint-bitwise-operators/7
     */
    function toInt(val){
        // we do not use lang/toNumber because of perf and also because it
        // doesn't break the functionality
        return ~~val;
    }

    module.exports = toInt;



},{}],36:[function(require,module,exports){
var forOwn = require('./forOwn');
var isPlainObject = require('../lang/isPlainObject');

    /**
     * Deeply copy missing properties in the target from the defaults.
     */
    function deepFillIn(target, defaults){
        var i = 0,
            n = arguments.length,
            obj;

        while(++i < n) {
            obj = arguments[i];
            if (obj) {
                // jshint loopfunc: true
                forOwn(obj, function(newValue, key) {
                    var curValue = target[key];
                    if (curValue == null) {
                        target[key] = newValue;
                    } else if (isPlainObject(curValue) &&
                               isPlainObject(newValue)) {
                        deepFillIn(curValue, newValue);
                    }
                });
            }
        }

        return target;
    }

    module.exports = deepFillIn;



},{"../lang/isPlainObject":28,"./forOwn":41}],37:[function(require,module,exports){
var forOwn = require('./forOwn');
var isArray = require('../lang/isArray');

    function containsMatch(array, pattern) {
        var i = -1, length = array.length;
        while (++i < length) {
            if (deepMatches(array[i], pattern)) {
                return true;
            }
        }

        return false;
    }

    function matchArray(target, pattern) {
        var i = -1, patternLength = pattern.length;
        while (++i < patternLength) {
            if (!containsMatch(target, pattern[i])) {
                return false;
            }
        }

        return true;
    }

    function matchObject(target, pattern) {
        var result = true;
        forOwn(pattern, function(val, key) {
            if (!deepMatches(target[key], val)) {
                // Return false to break out of forOwn early
                return (result = false);
            }
        });

        return result;
    }

    /**
     * Recursively check if the objects match.
     */
    function deepMatches(target, pattern){
        if (target && typeof target === 'object') {
            if (isArray(target) && isArray(pattern)) {
                return matchArray(target, pattern);
            } else {
                return matchObject(target, pattern);
            }
        } else {
            return target === pattern;
        }
    }

    module.exports = deepMatches;



},{"../lang/isArray":20,"./forOwn":41}],38:[function(require,module,exports){
var forOwn = require('./forOwn');
var isPlainObject = require('../lang/isPlainObject');

    /**
     * Mixes objects into the target object, recursively mixing existing child
     * objects.
     */
    function deepMixIn(target, objects) {
        var i = 0,
            n = arguments.length,
            obj;

        while(++i < n){
            obj = arguments[i];
            if (obj) {
                forOwn(obj, copyProp, target);
            }
        }

        return target;
    }

    function copyProp(val, key) {
        var existing = this[key];
        if (isPlainObject(val) && isPlainObject(existing)) {
            deepMixIn(existing, val);
        } else {
            this[key] = val;
        }
    }

    module.exports = deepMixIn;



},{"../lang/isPlainObject":28,"./forOwn":41}],39:[function(require,module,exports){
var forOwn = require('./forOwn');
var makeIterator = require('../function/makeIterator_');

    /**
     * Creates a new object with all the properties where the callback returns
     * true.
     */
    function filterValues(obj, callback, thisObj) {
        callback = makeIterator(callback, thisObj);
        var output = {};
        forOwn(obj, function(value, key, obj) {
            if (callback(value, key, obj)) {
                output[key] = value;
            }
        });

        return output;
    }
    module.exports = filterValues;


},{"../function/makeIterator_":16,"./forOwn":41}],40:[function(require,module,exports){
var hasOwn = require('./hasOwn');

    var _hasDontEnumBug,
        _dontEnums;

    function checkDontEnum(){
        _dontEnums = [
                'toString',
                'toLocaleString',
                'valueOf',
                'hasOwnProperty',
                'isPrototypeOf',
                'propertyIsEnumerable',
                'constructor'
            ];

        _hasDontEnumBug = true;

        for (var key in {'toString': null}) {
            _hasDontEnumBug = false;
        }
    }

    /**
     * Similar to Array/forEach but works over object properties and fixes Don't
     * Enum bug on IE.
     * based on: http://whattheheadsaid.com/2010/10/a-safer-object-keys-compatibility-implementation
     */
    function forIn(obj, fn, thisObj){
        var key, i = 0;
        // no need to check if argument is a real object that way we can use
        // it for arrays, functions, date, etc.

        //post-pone check till needed
        if (_hasDontEnumBug == null) checkDontEnum();

        for (key in obj) {
            if (exec(fn, obj, key, thisObj) === false) {
                break;
            }
        }


        if (_hasDontEnumBug) {
            var ctor = obj.constructor,
                isProto = !!ctor && obj === ctor.prototype;

            while (key = _dontEnums[i++]) {
                // For constructor, if it is a prototype object the constructor
                // is always non-enumerable unless defined otherwise (and
                // enumerated above).  For non-prototype objects, it will have
                // to be defined on this object, since it cannot be defined on
                // any prototype objects.
                //
                // For other [[DontEnum]] properties, check if the value is
                // different than Object prototype value.
                if (
                    (key !== 'constructor' ||
                        (!isProto && hasOwn(obj, key))) &&
                    obj[key] !== Object.prototype[key]
                ) {
                    if (exec(fn, obj, key, thisObj) === false) {
                        break;
                    }
                }
            }
        }
    }

    function exec(fn, obj, key, thisObj){
        return fn.call(thisObj, obj[key], key, obj);
    }

    module.exports = forIn;



},{"./hasOwn":44}],41:[function(require,module,exports){
var hasOwn = require('./hasOwn');
var forIn = require('./forIn');

    /**
     * Similar to Array/forEach but works over object properties and fixes Don't
     * Enum bug on IE.
     * based on: http://whattheheadsaid.com/2010/10/a-safer-object-keys-compatibility-implementation
     */
    function forOwn(obj, fn, thisObj){
        forIn(obj, function(val, key){
            if (hasOwn(obj, key)) {
                return fn.call(thisObj, obj[key], key, obj);
            }
        });
    }

    module.exports = forOwn;



},{"./forIn":40,"./hasOwn":44}],42:[function(require,module,exports){
var isPrimitive = require('../lang/isPrimitive');

    /**
     * get "nested" object property
     */
    function get(obj, prop){
        var parts = prop.split('.'),
            last = parts.pop();

        while (prop = parts.shift()) {
            obj = obj[prop];
            if (obj == null) return;
        }

        return obj[last];
    }

    module.exports = get;



},{"../lang/isPrimitive":29}],43:[function(require,module,exports){
var get = require('./get');

    var UNDEF;

    /**
     * Check if object has nested property.
     */
    function has(obj, prop){
        return get(obj, prop) !== UNDEF;
    }

    module.exports = has;




},{"./get":42}],44:[function(require,module,exports){


    /**
     * Safer Object.hasOwnProperty
     */
     function hasOwn(obj, prop){
         return Object.prototype.hasOwnProperty.call(obj, prop);
     }

     module.exports = hasOwn;



},{}],45:[function(require,module,exports){
var forOwn = require('./forOwn');

    /**
     * Get object keys
     */
     var keys = Object.keys || function (obj) {
            var keys = [];
            forOwn(obj, function(val, key){
                keys.push(key);
            });
            return keys;
        };

    module.exports = keys;



},{"./forOwn":41}],46:[function(require,module,exports){
var forOwn = require('./forOwn');
var makeIterator = require('../function/makeIterator_');

    /**
     * Creates a new object where all the values are the result of calling
     * `callback`.
     */
    function mapValues(obj, callback, thisObj) {
        callback = makeIterator(callback, thisObj);
        var output = {};
        forOwn(obj, function(val, key, obj) {
            output[key] = callback(val, key, obj);
        });

        return output;
    }
    module.exports = mapValues;


},{"../function/makeIterator_":16,"./forOwn":41}],47:[function(require,module,exports){
var hasOwn = require('./hasOwn');
var deepClone = require('../lang/deepClone');
var isObject = require('../lang/isObject');

    /**
     * Deep merge objects.
     */
    function merge() {
        var i = 1,
            key, val, obj, target;

        // make sure we don't modify source element and it's properties
        // objects are passed by reference
        target = deepClone( arguments[0] );

        while (obj = arguments[i++]) {
            for (key in obj) {
                if ( ! hasOwn(obj, key) ) {
                    continue;
                }

                val = obj[key];

                if ( isObject(val) && isObject(target[key]) ){
                    // inception, deep merge objects
                    target[key] = merge(target[key], val);
                } else {
                    // make sure arrays, regexp, date, objects are cloned
                    target[key] = deepClone(val);
                }

            }
        }

        return target;
    }

    module.exports = merge;



},{"../lang/deepClone":19,"../lang/isObject":27,"./hasOwn":44}],48:[function(require,module,exports){
var forOwn = require('./forOwn');

    /**
    * Combine properties from all the objects into first one.
    * - This method affects target object in place, if you want to create a new Object pass an empty object as first param.
    * @param {object} target    Target Object
    * @param {...object} objects    Objects to be combined (0...n objects).
    * @return {object} Target Object.
    */
    function mixIn(target, objects){
        var i = 0,
            n = arguments.length,
            obj;
        while(++i < n){
            obj = arguments[i];
            if (obj != null) {
                forOwn(obj, copyProp, target);
            }
        }
        return target;
    }

    function copyProp(val, key){
        this[key] = val;
    }

    module.exports = mixIn;


},{"./forOwn":41}],49:[function(require,module,exports){
var slice = require('../array/slice');

    /**
     * Return a copy of the object, filtered to only have values for the whitelisted keys.
     */
    function pick(obj, var_keys){
        var keys = typeof arguments[1] !== 'string'? arguments[1] : slice(arguments, 1),
            out = {},
            i = 0, key;
        while (key = keys[i++]) {
            out[key] = obj[key];
        }
        return out;
    }

    module.exports = pick;



},{"../array/slice":12}],50:[function(require,module,exports){
var has = require('./has');

    /**
     * Unset object property.
     */
    function unset(obj, prop){
        if (has(obj, prop)) {
            var parts = prop.split('.'),
                last = parts.pop();
            while (prop = parts.shift()) {
                obj = obj[prop];
            }
            return (delete obj[last]);

        } else {
            // if property doesn't exist treat as deleted
            return true;
        }
    }

    module.exports = unset;



},{"./has":43}]},{},[2])(2)
});