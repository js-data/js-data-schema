import isString from 'mout/lang/isString';
import isBoolean from 'mout/lang/isBoolean';
import isNumber from 'mout/lang/isNumber';
import isObject from 'mout/lang/isObject';
import isDate from 'mout/lang/isDate';
import isFunction from 'mout/lang/isFunction';
import isUndefined from 'mout/lang/isUndefined';
import isArray from 'mout/lang/isArray';
import isEmpty from 'mout/lang/isEmpty';
import toString from 'mout/lang/toString';
import toNumber from 'mout/lang/toNumber';

import _get from 'mout/object/get';
import deepMixIn from 'mout/object/deepMixIn';
import deepFillIn from 'mout/object/deepFillIn';
import forOwn from 'mout/object/forOwn';
import keys from 'mout/object/keys';
import pick from 'mout/object/pick';
import filter from 'mout/object/filter';
import map from 'mout/object/map';
import merge from 'mout/object/merge';
import unset from 'mout/object/unset';

import contains from 'mout/array/contains';
import intersection from 'mout/array/intersection';
import difference from 'mout/array/difference';
import unique from 'mout/array/unique';

import toInt from 'mout/number/toInt';

export default {
  isString,
  isBoolean,
  isNumber,
  isObject,
  isDate,
  isFunction,
  isUndefined,
  isArray,
  isEmpty,
  toString,
  toNumber,

  'get': _get,
  deepMixIn,
  deepFillIn,
  forOwn,
  keys,
  pick,
  filter,
  map,
  merge,
  unset,

  contains,
  intersection,
  difference,
  unique,

  toInt,

  errMsg(rule, actual, expected) {
    return {
      rule,
      actual,
      expected
    };
  },

  parallel(tasks, cb) {
    var results = {};
    var completed = 0;
    var length = 0;

    forOwn(tasks, () => {
      length += 1;
    });


    forOwn(tasks, function (task, key) {
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
