import utils from './utils';
import defaultDataTypes from './dataTypes';
import defaultRules from './rules';
import Schema from './schema';
let id = 1;

class Schemator {
  constructor() {
    this.dataTypes = {};
    this.rules = {};
    this.schemata = {};
    this.id = id++;
  }

  availableDataTypes() {
    return utils.unique(utils.keys(this.dataTypes).concat(utils.keys(defaultDataTypes)));
  }

  availableRules() {
    return utils.unique(utils.keys(this.rules).concat(utils.keys(defaultRules)));
  }

  availableSchemata() {
    return utils.keys(this.schemata);
  }

  defineDataType(name, typeDefinition) {
    if (!utils.isString(name)) {
      throw new Error('"name" must be a string!');
    } else if (!utils.isFunction(typeDefinition)) {
      throw new Error('"typeDefinition" must be a function!');
    } else if (this.dataTypes[name]) {
      throw new Error('dataType already registered!');
    }
    this.dataTypes[name] = typeDefinition;
  }

  defineRule(name, ruleFunc, async) {
    if (!utils.isString(name)) {
      throw new Error('"name" must be a string!');
    } else if (!utils.isFunction(ruleFunc)) {
      throw new Error('"ruleFunc" must be a function!');
    } else if (this.rules[name]) {
      throw new Error('rule already registered!');
    }
    this.rules[name] = ruleFunc;
    this.rules[name].async = !!async;
  }

  defineSchema(name, schema) {
    if (this.schemata[name]) {
      throw new Error('schema already registered!');
    } else if (schema instanceof Schema) {
      throw new Error('schema registered elsewhere!');
    }
    this.schemata[name] = new Schema(name, schema, this);
    this.schemata[name].parent = this;
    return this.schemata[name];
  }

  getDataType(name) {
    return this.dataTypes[name] || defaultDataTypes[name];
  }

  getRule(name) {
    return this.rules[name] || defaultRules[name];
  }

  getSchema(name) {
    return this.schemata[name];
  }

  removeDataType(name) {
    delete this.dataTypes[name];
  }

  removeRule(name) {
    delete this.rules[name];
  }

  removeSchema(name) {
    delete this.schemata[name];
  }

  schemaCheck(name) {
    if (!this.schemata[name]) {
      throw new Error('schema is not registered!');
    }
  }

  validateSync(name, attrs, options) {
    this.schemaCheck(name);
    return this.schemata[name].validateSync(attrs, options);
  }

  validate(name, attrs, options, cb) {
    this.schemaCheck(name);
    return this.schemata[name].validate(attrs, options, cb);
  }

  addDefaultsToTarget(name, target, overwrite) {
    this.schemaCheck(name);
    return this.schemata[name].addDefaultsToTarget(target, overwrite);
  }

  setDefaults(name, attrs) {
    this.schemaCheck(name);
    return this.schemata[name].setDefaults(attrs);
  }

  getDefaults(name) {
    this.schemaCheck(name);
    return this.schemata[name].getDefaults();
  }

  stripNonSchemaAttrs(name, attrs) {
    this.schemaCheck(name);
    return this.schemata[name].stripNonSchemaAttrs(attrs);
  }
}

export default Schemator;
