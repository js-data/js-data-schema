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
