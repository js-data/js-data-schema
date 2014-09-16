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
