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
