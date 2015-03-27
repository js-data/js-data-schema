import utils from './utils';

export default {
  string(x) {
    return utils.isString(x) ? null : utils.errMsg('type', typeof x, 'string');
  },
  number(x) {
    return utils.isNumber(x) ? null : utils.errMsg('type', typeof x, 'number');
  },
  integer(x) {
    if (!utils.isNumber(x)) {
      return utils.errMsg('type', typeof x, 'integer');
    } else if (Math.abs(x) - Math.abs(utils.toInt(x)) !== 0) {
      return utils.errMsg('type', 'real', 'integer');
    } else {
      return null;
    }
  },
  float(x) {
    return utils.isNumber(x) ? null : utils.errMsg('type', typeof x, 'float');
  },
  array(x) {
    return utils.isArray(x) ? null : utils.errMsg('type', typeof x, 'array');
  },
  object(x) {
    return utils.isObject(x) ? null : utils.errMsg('type', typeof x, 'object');
  },
  boolean(x) {
    return utils.isBoolean(x) ? null : utils.errMsg('type', typeof x, 'boolean');
  },
  date(x) {
    return utils.isDate(x) ? null : utils.errMsg('type', typeof x, 'date');
  }
};
