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
