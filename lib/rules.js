import utils from './utils';
import defaultDataTypes from './dataTypes';

export default {
  nullable(x, nullable) {
    return (x === null || x === undefined) && !nullable ? utils.errMsg('nullable', `x === ${x}`, 'x !== null && x !== undefined') : null;
  },
  max(x, max) {
    return utils.isNumber(x) && utils.isNumber(max) && x > max ? utils.errMsg('max', `${x} > ${max}`, `${x} <= ${max}`) : null;
  },
  min(x, min) {
    return utils.isNumber(x) && utils.isNumber(min) && x < min ? utils.errMsg('min', `${x} < ${min}`, `${x} >= ${min}`) : null;
  },
  maxLength(x, maxLength) {
    return (utils.isString(x) || utils.isArray(x)) && utils.isNumber(maxLength) && x.length > maxLength ? utils.errMsg('maxLength', `${x.length} > ${maxLength}`, `${x.length} <= ${maxLength}`) : null;
  },
  minLength(x, minLength) {
    return (utils.isString(x) || utils.isArray(x)) && utils.isNumber(minLength) && x.length < minLength ? utils.errMsg('minLength', `${x.length} < ${minLength}`, `${x.length} >= ${minLength}`) : null;
  },
  type(x, type, customType, parent) {
    return customType ? customType(x) : parent.dataTypes[type] ? parent.dataTypes[type](x) : defaultDataTypes[type] ? defaultDataTypes[type](x) : null;
  }
};
