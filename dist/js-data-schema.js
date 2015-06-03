/*!
 * js-data-schema
 * @version 1.2.5 - Homepage <https://github.com/js-data/js-data-schema/>
 * @author Jason Dobry <jason.dobry@gmail.com>
 * @copyright (c) 2013-2015 Jason Dobry 
 * @license MIT <https://github.com/js-data/js-data-schema/blob/master/LICENSE>
 * 
 * @overview Define and validate rules, datatypes and schemata in Node and in the browser.
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define(factory);
	else if(typeof exports === 'object')
		exports["Schemator"] = factory();
	else
		root["Schemator"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _utils = __webpack_require__(1);

	var _utils2 = _interopRequireDefault(_utils);

	var _dataTypes = __webpack_require__(47);

	var _dataTypes2 = _interopRequireDefault(_dataTypes);

	var _rules = __webpack_require__(48);

	var _rules2 = _interopRequireDefault(_rules);

	var _schema = __webpack_require__(49);

	var _schema2 = _interopRequireDefault(_schema);

	var id = 1;

	var Schemator = (function () {
	  function Schemator() {
	    _classCallCheck(this, Schemator);

	    this.dataTypes = {};
	    this.rules = {};
	    this.schemata = {};
	    this.id = id++;
	  }

	  _createClass(Schemator, [{
	    key: 'availableDataTypes',
	    value: function availableDataTypes() {
	      return _utils2['default'].unique(_utils2['default'].keys(this.dataTypes).concat(_utils2['default'].keys(_dataTypes2['default'])));
	    }
	  }, {
	    key: 'availableRules',
	    value: function availableRules() {
	      return _utils2['default'].unique(_utils2['default'].keys(this.rules).concat(_utils2['default'].keys(_rules2['default'])));
	    }
	  }, {
	    key: 'availableSchemata',
	    value: function availableSchemata() {
	      return _utils2['default'].keys(this.schemata);
	    }
	  }, {
	    key: 'defineDataType',
	    value: function defineDataType(name, typeDefinition) {
	      if (!_utils2['default'].isString(name)) {
	        throw new Error('"name" must be a string!');
	      } else if (!_utils2['default'].isFunction(typeDefinition)) {
	        throw new Error('"typeDefinition" must be a function!');
	      } else if (this.dataTypes[name]) {
	        throw new Error('dataType already registered!');
	      }
	      this.dataTypes[name] = typeDefinition;
	    }
	  }, {
	    key: 'defineRule',
	    value: function defineRule(name, ruleFunc, async) {
	      if (!_utils2['default'].isString(name)) {
	        throw new Error('"name" must be a string!');
	      } else if (!_utils2['default'].isFunction(ruleFunc)) {
	        throw new Error('"ruleFunc" must be a function!');
	      } else if (this.rules[name]) {
	        throw new Error('rule already registered!');
	      }
	      this.rules[name] = ruleFunc;
	      this.rules[name].async = !!async;
	    }
	  }, {
	    key: 'defineSchema',
	    value: function defineSchema(name, schema) {
	      if (this.schemata[name]) {
	        throw new Error('schema already registered!');
	      } else if (schema instanceof _schema2['default']) {
	        throw new Error('schema registered elsewhere!');
	      }
	      this.schemata[name] = new _schema2['default'](name, schema, this);
	      this.schemata[name].parent = this;
	      return this.schemata[name];
	    }
	  }, {
	    key: 'getDataType',
	    value: function getDataType(name) {
	      return this.dataTypes[name] || _dataTypes2['default'][name];
	    }
	  }, {
	    key: 'getRule',
	    value: function getRule(name) {
	      return this.rules[name] || _rules2['default'][name];
	    }
	  }, {
	    key: 'getSchema',
	    value: function getSchema(name) {
	      return this.schemata[name];
	    }
	  }, {
	    key: 'removeDataType',
	    value: function removeDataType(name) {
	      delete this.dataTypes[name];
	    }
	  }, {
	    key: 'removeRule',
	    value: function removeRule(name) {
	      delete this.rules[name];
	    }
	  }, {
	    key: 'removeSchema',
	    value: function removeSchema(name) {
	      delete this.schemata[name];
	    }
	  }, {
	    key: 'schemaCheck',
	    value: function schemaCheck(name) {
	      if (!this.schemata[name]) {
	        throw new Error('schema is not registered!');
	      }
	    }
	  }, {
	    key: 'validateSync',
	    value: function validateSync(name, attrs, options) {
	      this.schemaCheck(name);
	      return this.schemata[name].validateSync(attrs, options);
	    }
	  }, {
	    key: 'validate',
	    value: function validate(name, attrs, options, cb) {
	      this.schemaCheck(name);
	      return this.schemata[name].validate(attrs, options, cb);
	    }
	  }, {
	    key: 'addDefaultsToTarget',
	    value: function addDefaultsToTarget(name, target, overwrite) {
	      this.schemaCheck(name);
	      return this.schemata[name].addDefaultsToTarget(target, overwrite);
	    }
	  }, {
	    key: 'setDefaults',
	    value: function setDefaults(name, attrs) {
	      this.schemaCheck(name);
	      return this.schemata[name].setDefaults(attrs);
	    }
	  }, {
	    key: 'getDefaults',
	    value: function getDefaults(name) {
	      this.schemaCheck(name);
	      return this.schemata[name].getDefaults();
	    }
	  }, {
	    key: 'stripNonSchemaAttrs',
	    value: function stripNonSchemaAttrs(name, attrs) {
	      this.schemaCheck(name);
	      return this.schemata[name].stripNonSchemaAttrs(attrs);
	    }
	  }]);

	  return Schemator;
	})();

	exports['default'] = Schemator;
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _moutLangIsString = __webpack_require__(7);

	var _moutLangIsString2 = _interopRequireDefault(_moutLangIsString);

	var _moutLangIsBoolean = __webpack_require__(10);

	var _moutLangIsBoolean2 = _interopRequireDefault(_moutLangIsBoolean);

	var _moutLangIsNumber = __webpack_require__(11);

	var _moutLangIsNumber2 = _interopRequireDefault(_moutLangIsNumber);

	var _moutLangIsObject = __webpack_require__(12);

	var _moutLangIsObject2 = _interopRequireDefault(_moutLangIsObject);

	var _moutLangIsDate = __webpack_require__(13);

	var _moutLangIsDate2 = _interopRequireDefault(_moutLangIsDate);

	var _moutLangIsFunction = __webpack_require__(14);

	var _moutLangIsFunction2 = _interopRequireDefault(_moutLangIsFunction);

	var _moutLangIsUndefined = __webpack_require__(15);

	var _moutLangIsUndefined2 = _interopRequireDefault(_moutLangIsUndefined);

	var _moutLangIsArray = __webpack_require__(16);

	var _moutLangIsArray2 = _interopRequireDefault(_moutLangIsArray);

	var _moutLangIsEmpty = __webpack_require__(17);

	var _moutLangIsEmpty2 = _interopRequireDefault(_moutLangIsEmpty);

	var _moutLangToString = __webpack_require__(18);

	var _moutLangToString2 = _interopRequireDefault(_moutLangToString);

	var _moutLangToNumber = __webpack_require__(19);

	var _moutLangToNumber2 = _interopRequireDefault(_moutLangToNumber);

	var _moutObjectGet = __webpack_require__(20);

	var _moutObjectGet2 = _interopRequireDefault(_moutObjectGet);

	var _moutObjectDeepMixIn = __webpack_require__(22);

	var _moutObjectDeepMixIn2 = _interopRequireDefault(_moutObjectDeepMixIn);

	var _moutObjectDeepFillIn = __webpack_require__(2);

	var _moutObjectDeepFillIn2 = _interopRequireDefault(_moutObjectDeepFillIn);

	var _moutObjectForOwn = __webpack_require__(3);

	var _moutObjectForOwn2 = _interopRequireDefault(_moutObjectForOwn);

	var _moutObjectKeys = __webpack_require__(23);

	var _moutObjectKeys2 = _interopRequireDefault(_moutObjectKeys);

	var _moutObjectPick = __webpack_require__(24);

	var _moutObjectPick2 = _interopRequireDefault(_moutObjectPick);

	var _moutObjectFilter = __webpack_require__(26);

	var _moutObjectFilter2 = _interopRequireDefault(_moutObjectFilter);

	var _moutObjectMap = __webpack_require__(31);

	var _moutObjectMap2 = _interopRequireDefault(_moutObjectMap);

	var _moutObjectMerge = __webpack_require__(32);

	var _moutObjectMerge2 = _interopRequireDefault(_moutObjectMerge);

	var _moutObjectUnset = __webpack_require__(36);

	var _moutObjectUnset2 = _interopRequireDefault(_moutObjectUnset);

	var _moutArrayContains = __webpack_require__(38);

	var _moutArrayContains2 = _interopRequireDefault(_moutArrayContains);

	var _moutArrayIntersection = __webpack_require__(40);

	var _moutArrayIntersection2 = _interopRequireDefault(_moutArrayIntersection);

	var _moutArrayDifference = __webpack_require__(44);

	var _moutArrayDifference2 = _interopRequireDefault(_moutArrayDifference);

	var _moutArrayUnique = __webpack_require__(41);

	var _moutArrayUnique2 = _interopRequireDefault(_moutArrayUnique);

	var _moutNumberToInt = __webpack_require__(46);

	var _moutNumberToInt2 = _interopRequireDefault(_moutNumberToInt);

	exports['default'] = {
	  isString: _moutLangIsString2['default'],
	  isBoolean: _moutLangIsBoolean2['default'],
	  isNumber: _moutLangIsNumber2['default'],
	  isObject: _moutLangIsObject2['default'],
	  isDate: _moutLangIsDate2['default'],
	  isFunction: _moutLangIsFunction2['default'],
	  isUndefined: _moutLangIsUndefined2['default'],
	  isArray: _moutLangIsArray2['default'],
	  isEmpty: _moutLangIsEmpty2['default'],
	  toString: _moutLangToString2['default'],
	  toNumber: _moutLangToNumber2['default'],

	  'get': _moutObjectGet2['default'],
	  deepMixIn: _moutObjectDeepMixIn2['default'],
	  deepFillIn: _moutObjectDeepFillIn2['default'],
	  forOwn: _moutObjectForOwn2['default'],
	  keys: _moutObjectKeys2['default'],
	  pick: _moutObjectPick2['default'],
	  filter: _moutObjectFilter2['default'],
	  map: _moutObjectMap2['default'],
	  merge: _moutObjectMerge2['default'],
	  unset: _moutObjectUnset2['default'],

	  contains: _moutArrayContains2['default'],
	  intersection: _moutArrayIntersection2['default'],
	  difference: _moutArrayDifference2['default'],
	  unique: _moutArrayUnique2['default'],

	  toInt: _moutNumberToInt2['default'],

	  errMsg: function errMsg(rule, actual, expected) {
	    return {
	      rule: rule,
	      actual: actual,
	      expected: expected
	    };
	  },

	  parallel: function parallel(tasks, cb) {
	    var results = {};
	    var completed = 0;
	    var length = 0;

	    (0, _moutObjectForOwn2['default'])(tasks, function () {
	      length += 1;
	    });

	    (0, _moutObjectForOwn2['default'])(tasks, function (task, key) {
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
	module.exports = exports['default'];

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var forOwn = __webpack_require__(3);
	var isPlainObject = __webpack_require__(6);

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




/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var hasOwn = __webpack_require__(4);
	var forIn = __webpack_require__(5);

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




/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	

	    /**
	     * Safer Object.hasOwnProperty
	     */
	     function hasOwn(obj, prop){
	         return Object.prototype.hasOwnProperty.call(obj, prop);
	     }

	     module.exports = hasOwn;




/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var hasOwn = __webpack_require__(4);

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




/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	

	    /**
	     * Checks if the value is created by the `Object` constructor.
	     */
	    function isPlainObject(value) {
	        return (!!value && typeof value === 'object' &&
	            value.constructor === Object);
	    }

	    module.exports = isPlainObject;




/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var isKind = __webpack_require__(8);
	    /**
	     */
	    function isString(val) {
	        return isKind(val, 'String');
	    }
	    module.exports = isString;



/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var kindOf = __webpack_require__(9);
	    /**
	     * Check if value is from a specific "kind".
	     */
	    function isKind(val, kind){
	        return kindOf(val) === kind;
	    }
	    module.exports = isKind;



/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	

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



/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var isKind = __webpack_require__(8);
	    /**
	     */
	    function isBoolean(val) {
	        return isKind(val, 'Boolean');
	    }
	    module.exports = isBoolean;



/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var isKind = __webpack_require__(8);
	    /**
	     */
	    function isNumber(val) {
	        return isKind(val, 'Number');
	    }
	    module.exports = isNumber;



/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var isKind = __webpack_require__(8);
	    /**
	     */
	    function isObject(val) {
	        return isKind(val, 'Object');
	    }
	    module.exports = isObject;



/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var isKind = __webpack_require__(8);
	    /**
	     */
	    function isDate(val) {
	        return isKind(val, 'Date');
	    }
	    module.exports = isDate;



/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var isKind = __webpack_require__(8);
	    /**
	     */
	    function isFunction(val) {
	        return isKind(val, 'Function');
	    }
	    module.exports = isFunction;



/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	
	    var UNDEF;

	    /**
	     */
	    function isUndef(val){
	        return val === UNDEF;
	    }
	    module.exports = isUndef;



/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var isKind = __webpack_require__(8);
	    /**
	     */
	    var isArray = Array.isArray || function (val) {
	        return isKind(val, 'Array');
	    };
	    module.exports = isArray;



/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var forOwn = __webpack_require__(3);
	var isArray = __webpack_require__(16);

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




/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	

	    /**
	     * Typecast a value to a String, using an empty string value for null or
	     * undefined.
	     */
	    function toString(val){
	        return val == null ? '' : val.toString();
	    }

	    module.exports = toString;




/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var isArray = __webpack_require__(16);

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




/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var isPrimitive = __webpack_require__(21);

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




/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	

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




/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	var forOwn = __webpack_require__(3);
	var isPlainObject = __webpack_require__(6);

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




/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	var forOwn = __webpack_require__(3);

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




/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	var slice = __webpack_require__(25);

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




/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	

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




/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	var forOwn = __webpack_require__(3);
	var makeIterator = __webpack_require__(27);

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



/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	var identity = __webpack_require__(28);
	var prop = __webpack_require__(29);
	var deepMatches = __webpack_require__(30);

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




/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	

	    /**
	     * Returns the first argument provided to it.
	     */
	    function identity(val){
	        return val;
	    }

	    module.exports = identity;




/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	

	    /**
	     * Returns a function that gets a property of the passed object
	     */
	    function prop(name){
	        return function(obj){
	            return obj[name];
	        };
	    }

	    module.exports = prop;




/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	var forOwn = __webpack_require__(3);
	var isArray = __webpack_require__(16);

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




/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	var forOwn = __webpack_require__(3);
	var makeIterator = __webpack_require__(27);

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



/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	var hasOwn = __webpack_require__(4);
	var deepClone = __webpack_require__(33);
	var isObject = __webpack_require__(12);

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




/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	var clone = __webpack_require__(34);
	var forOwn = __webpack_require__(3);
	var kindOf = __webpack_require__(9);
	var isPlainObject = __webpack_require__(6);

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





/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	var kindOf = __webpack_require__(9);
	var isPlainObject = __webpack_require__(6);
	var mixIn = __webpack_require__(35);

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
	        flags += r.ignoreCase ? 'i' : '';
	        return new RegExp(r.source, flags);
	    }

	    function cloneDate(date) {
	        return new Date(+date);
	    }

	    function cloneArray(arr) {
	        return arr.slice();
	    }

	    module.exports = clone;




/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	var forOwn = __webpack_require__(3);

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



/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	var has = __webpack_require__(37);

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




/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	var get = __webpack_require__(20);

	    var UNDEF;

	    /**
	     * Check if object has nested property.
	     */
	    function has(obj, prop){
	        return get(obj, prop) !== UNDEF;
	    }

	    module.exports = has;





/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	var indexOf = __webpack_require__(39);

	    /**
	     * If array contains values.
	     */
	    function contains(arr, val) {
	        return indexOf(arr, val) !== -1;
	    }
	    module.exports = contains;



/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	

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



/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	var unique = __webpack_require__(41);
	var filter = __webpack_require__(42);
	var every = __webpack_require__(43);
	var contains = __webpack_require__(38);
	var slice = __webpack_require__(25);


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




/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	var filter = __webpack_require__(42);

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




/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	var makeIterator = __webpack_require__(27);

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




/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	var makeIterator = __webpack_require__(27);

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



/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	var unique = __webpack_require__(41);
	var filter = __webpack_require__(42);
	var some = __webpack_require__(45);
	var contains = __webpack_require__(38);
	var slice = __webpack_require__(25);


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




/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	var makeIterator = __webpack_require__(27);

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



/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	

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




/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _utils = __webpack_require__(1);

	var _utils2 = _interopRequireDefault(_utils);

	exports['default'] = {
	  string: function string(x) {
	    return _utils2['default'].isString(x) ? null : _utils2['default'].errMsg('type', typeof x, 'string');
	  },
	  number: function number(x) {
	    return _utils2['default'].isNumber(x) ? null : _utils2['default'].errMsg('type', typeof x, 'number');
	  },
	  integer: function integer(x) {
	    if (!_utils2['default'].isNumber(x)) {
	      return _utils2['default'].errMsg('type', typeof x, 'integer');
	    } else if (Math.abs(x) - Math.abs(_utils2['default'].toInt(x)) !== 0) {
	      return _utils2['default'].errMsg('type', 'real', 'integer');
	    } else {
	      return null;
	    }
	  },
	  float: function float(x) {
	    return _utils2['default'].isNumber(x) ? null : _utils2['default'].errMsg('type', typeof x, 'float');
	  },
	  array: function array(x) {
	    return _utils2['default'].isArray(x) ? null : _utils2['default'].errMsg('type', typeof x, 'array');
	  },
	  object: function object(x) {
	    return _utils2['default'].isObject(x) ? null : _utils2['default'].errMsg('type', typeof x, 'object');
	  },
	  boolean: function boolean(x) {
	    return _utils2['default'].isBoolean(x) ? null : _utils2['default'].errMsg('type', typeof x, 'boolean');
	  },
	  date: function date(x) {
	    return _utils2['default'].isDate(x) ? null : _utils2['default'].errMsg('type', typeof x, 'date');
	  }
	};
	module.exports = exports['default'];

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _utils = __webpack_require__(1);

	var _utils2 = _interopRequireDefault(_utils);

	var _dataTypes = __webpack_require__(47);

	var _dataTypes2 = _interopRequireDefault(_dataTypes);

	exports['default'] = {
	  nullable: function nullable(x, _nullable) {
	    return (x === null || x === undefined) && !_nullable ? _utils2['default'].errMsg('nullable', 'x === ' + x, 'x !== null && x !== undefined') : null;
	  },
	  max: function max(x, _max) {
	    return _utils2['default'].isNumber(x) && _utils2['default'].isNumber(_max) && x > _max ? _utils2['default'].errMsg('max', '' + x + ' > ' + _max, '' + x + ' <= ' + _max) : null;
	  },
	  min: function min(x, _min) {
	    return _utils2['default'].isNumber(x) && _utils2['default'].isNumber(_min) && x < _min ? _utils2['default'].errMsg('min', '' + x + ' < ' + _min, '' + x + ' >= ' + _min) : null;
	  },
	  maxLength: function maxLength(x, _maxLength) {
	    return (_utils2['default'].isString(x) || _utils2['default'].isArray(x)) && _utils2['default'].isNumber(_maxLength) && x.length > _maxLength ? _utils2['default'].errMsg('maxLength', '' + x.length + ' > ' + _maxLength, '' + x.length + ' <= ' + _maxLength) : null;
	  },
	  minLength: function minLength(x, _minLength) {
	    return (_utils2['default'].isString(x) || _utils2['default'].isArray(x)) && _utils2['default'].isNumber(_minLength) && x.length < _minLength ? _utils2['default'].errMsg('minLength', '' + x.length + ' < ' + _minLength, '' + x.length + ' >= ' + _minLength) : null;
	  },
	  type: function type(x, _type, customType, parent) {
	    return customType ? customType(x) : parent.dataTypes[_type] ? parent.dataTypes[_type](x) : _dataTypes2['default'][_type] ? _dataTypes2['default'][_type](x) : null;
	  }
	};
	module.exports = exports['default'];

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	/*jshint latedef:false*/

	var _utils = __webpack_require__(1);

	var _utils2 = _interopRequireDefault(_utils);

	var _rules = __webpack_require__(48);

	var _rules2 = _interopRequireDefault(_rules);

	var hasObject = function hasObject(v) {
	  var has = false;
	  _utils2['default'].forOwn(v, function (_v) {
	    if (_utils2['default'].isObject(_v)) {
	      has = true;
	      return false;
	    }
	  });
	  return has;
	};

	function _executeRulesSync(targetKey, options, errors, value, key) {
	  var _this = this;

	  var nestedKey = targetKey + (targetKey.length ? '.' : '') + key;
	  var schemaRules = _utils2['default'].get(this.schema, nestedKey);

	  if (!schemaRules) {
	    return;
	  } else if (_utils2['default'].isObject(value) || hasObject(schemaRules)) {
	    var err = _validateSync.apply(this, [nestedKey, value || {}, options]);
	    if (err) {
	      errors[key] = err;
	    }
	  } else {
	    if (!_utils2['default'].isObject(schemaRules)) {
	      return;
	    } else if (schemaRules.nullable === true) {
	      var nullable = this.parent.rules.nullable || _rules2['default'].nullable;
	      var nErr = nullable.call(options.ctx, value, true, undefined, this.parent);

	      if (nErr === null) {
	        return;
	      }
	    }
	    _utils2['default'].forOwn(schemaRules, function (ruleValue, ruleKey) {
	      var rule = _this.parent.rules[ruleKey] || _rules2['default'][ruleKey];
	      if (rule && !rule.async) {
	        var err = rule.call(options.ctx, value, ruleValue, undefined, _this.parent);
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
	  var _this2 = this;

	  var errors = {};

	  try {
	    // Validate present attributes
	    _utils2['default'].forOwn(attrs, function (value, key) {
	      _executeRulesSync.call(_this2, targetKey, options, errors, value, key);
	    });
	    // Validate missing attributes
	    if (!options.ignoreMissing) {
	      var schema = targetKey ? _utils2['default'].get(this.schema, targetKey) || {} : this.schema;
	      var missing = _utils2['default'].difference(_utils2['default'].keys(schema), _utils2['default'].keys(attrs));
	      missing = _utils2['default'].pick(this.schema, missing);
	      missing = _utils2['default'].map(missing, function () {
	        return undefined;
	      });
	      _utils2['default'].forOwn(missing, function (value, key) {
	        _executeRulesSync.call(_this2, targetKey, options, errors, value, key);
	      });
	    }
	    if (!_utils2['default'].isEmpty(errors)) {
	      return errors;
	    } else {
	      return null;
	    }
	  } catch (err) {
	    return err;
	  }
	}

	function _executeRules(options, value, key, prefix, errors, deepQueue, ruleQueue) {
	  var _this3 = this;

	  var nestedKey = prefix + key;
	  var schemaRules = _utils2['default'].get(this.schema, nestedKey);

	  if (!schemaRules) {
	    return;
	  } else if (_utils2['default'].isObject(value) || hasObject(schemaRules)) {
	    // Recurse down into nested attributes
	    deepQueue[key] = (function (nK, val) {
	      return function (next) {
	        _validate.apply(_this3, [nK, val || {}, options, next]);
	      };
	    })(nestedKey, value);
	  } else {
	    if (!_utils2['default'].isObject(schemaRules)) {
	      return;
	    } else if (schemaRules.nullable === true) {
	      var nullable = this.parent.rules.nullable || _rules2['default'].nullable;
	      var nErr = nullable.call(options.ctx, value, true, undefined, this.parent);

	      if (nErr === null) {
	        return;
	      }
	    }
	    _utils2['default'].forOwn(schemaRules, function (ruleValue, ruleKey) {
	      var rule = _this3.parent.rules[ruleKey] || _rules2['default'][ruleKey];
	      // Asynchronous rules get added to the queue
	      if (rule && rule.async) {
	        ruleQueue['' + ruleKey + '_' + ruleValue] = (function (r, key, val, rVal) {
	          return function (next) {
	            r.call(options.ctx, val, rVal, function (err) {
	              next(null, { err: err, key: key });
	            });
	          };
	        })(rule, key, value, ruleValue);
	      } else {
	        // Get results of synchronous rules immediately
	        var err = rule.call(options.ctx, value, ruleValue, undefined, _this3.parent);
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
	  var _this4 = this;

	  var errors = {};
	  var prefix = targetKey + (targetKey.length ? '.' : '');
	  var deepQueue = {};
	  var ruleQueue = {};
	  var first = options.first;

	  delete options.first;

	  _utils2['default'].forOwn(attrs, function (value, key) {
	    _executeRules.call(_this4, options, value, key, prefix, errors, deepQueue, ruleQueue);
	  });

	  // Validate missing attributes
	  if (!options.ignoreMissing) {
	    var schema = targetKey ? _utils2['default'].get(this.schema, targetKey) || {} : this.schema;
	    var missing = _utils2['default'].difference(_utils2['default'].keys(schema), _utils2['default'].keys(attrs));

	    missing = _utils2['default'].pick(this.schema, missing);
	    missing = _utils2['default'].map(missing, function () {
	      return undefined;
	    });

	    _utils2['default'].forOwn(missing, function (value, key) {
	      _executeRules.call(_this4, options, value, key, prefix, errors, deepQueue, ruleQueue);
	    });
	  }

	  var finalQueue = {};

	  if (!_utils2['default'].isEmpty(deepQueue)) {
	    finalQueue.deepQueue = function (next) {
	      _utils2['default'].parallel(deepQueue, next);
	    };
	  }
	  if (!_utils2['default'].isEmpty(ruleQueue)) {
	    finalQueue.ruleQueue = function (next) {
	      _utils2['default'].parallel(ruleQueue, next);
	    };
	  }

	  if (!_utils2['default'].isEmpty(finalQueue)) {
	    _utils2['default'].parallel(finalQueue, function (err, results) {

	      // Merge results of recursion
	      if (results.deepQueue) {
	        results.deepQueue = _utils2['default'].filter(results.deepQueue, function (x) {
	          return x !== undefined && x !== null;
	        });
	        _utils2['default'].deepMixIn(errors, results.deepQueue);
	      }

	      // Merge results of asynchronous rules
	      if (results.ruleQueue) {
	        if (results.ruleQueue) {
	          results.ruleQueue = _utils2['default'].filter(results.ruleQueue, function (x) {
	            return x.err !== undefined && x.err !== null;
	          });
	        }
	        _utils2['default'].forOwn(results.ruleQueue, function (value) {
	          if (!errors[value.key]) {
	            errors[value.key] = {
	              errors: []
	            };
	          }
	          errors[value.key].errors.push(value.err);
	        });
	      }

	      if (!_utils2['default'].isEmpty(errors)) {
	        first ? cb(errors) : cb(null, errors);
	      } else {
	        cb(null);
	      }
	    });
	  } else {
	    if (!_utils2['default'].isEmpty(errors)) {
	      first ? cb(errors) : cb(null, errors);
	    } else {
	      cb(null);
	    }
	  }
	}

	function _validateSchema(attrs, rules) {
	  rules = rules || [];
	  var keys = _utils2['default'].keys(attrs);
	  var noRules = _utils2['default'].intersection(keys, rules).length === 0;

	  _utils2['default'].forOwn(attrs, function (value, key) {
	    if (noRules && _utils2['default'].isString(value)) {
	      attrs[key] = {
	        type: value
	      };
	    } else if (_utils2['default'].isObject(value)) {
	      _validateSchema(value, rules);
	    }
	  });
	}

	var errors = {
	  a: 'Schema#validateSync(attrs[, options]): ',
	  b: 'Schema#validate(attrs[, options], cb): '
	};

	var Schema = (function () {
	  function Schema(name, schema, parent) {
	    _classCallCheck(this, Schema);

	    if (!_utils2['default'].isString(name)) {
	      throw new Error('"name" must be a string!');
	    } else if (!_utils2['default'].isObject(schema)) {
	      throw new Error('"schema" must be an object!');
	    }
	    this.name = name;
	    _validateSchema(schema, parent ? parent.availableRules() : _rules2['default']);
	    this.schema = schema;
	  }

	  _createClass(Schema, [{
	    key: 'validateSync',
	    value: function validateSync(attrs, options) {
	      options = options ? options === true ? { ignoreMissing: true } : options : {};
	      if (!_utils2['default'].isObject(attrs)) {
	        throw new Error('' + errors.a + 'attrs: Must be an object!');
	      } else if (!_utils2['default'].isObject(options)) {
	        throw new Error('' + errors.a + 'options: Must be an object!');
	      }
	      options.ctx = attrs;
	      return _validateSync.call(this, '', attrs, options);
	    }
	  }, {
	    key: 'validate',
	    value: function validate(attrs, options, cb) {
	      options = options ? options === true ? { ignoreMissing: true } : options : {};
	      if (_utils2['default'].isFunction(options)) {
	        cb = options;
	        options = {};
	      }
	      if (!_utils2['default'].isFunction(cb)) {
	        throw new Error('' + errors.b + 'cb: Must be a function!');
	      } else if (!_utils2['default'].isObject(attrs)) {
	        return cb(new Error('' + errors.b + 'attrs: Must be an object!'));
	      } else if (!_utils2['default'].isObject(options)) {
	        return cb(new Error('' + errors.b + 'options: Must be an object!'));
	      }
	      options.first = true;
	      options.ctx = attrs;
	      _validate.call(this, '', attrs, options, cb);
	    }
	  }, {
	    key: 'addDefaultsToTarget',
	    value: function addDefaultsToTarget(target, overwrite) {
	      if (!_utils2['default'].isObject(target)) {
	        throw new Error('"target" must be an object!');
	      } else if (!this.defaults) {
	        throw new Error('No defaults have been set!');
	      } else if (overwrite) {
	        _utils2['default'].deepMixIn(target, this.defaults);
	      } else {
	        _utils2['default'].deepFillIn(target, this.defaults);
	      }
	    }
	  }, {
	    key: 'setDefaults',
	    value: function setDefaults(attrs) {
	      if (!_utils2['default'].isObject(attrs)) {
	        throw new Error('Schema#defaults(attrs): attrs: Must be an object!');
	      } else {
	        this.defaults = _utils2['default'].merge({}, attrs);
	      }
	      return this;
	    }
	  }, {
	    key: 'getDefaults',
	    value: function getDefaults() {
	      return _utils2['default'].merge({}, this.defaults);
	    }
	  }, {
	    key: 'stripNonSchemaAttrs',
	    value: function stripNonSchemaAttrs(attrs) {
	      _stripNonSchemaAttrs(attrs, this.schema);
	      return attrs;
	    }
	  }]);

	  return Schema;
	})();

	function _stripNonSchemaAttrs(attrs, schemaLevel) {
	  _utils2['default'].forOwn(attrs, function (value, key) {
	    if (schemaLevel[key]) {
	      if (_utils2['default'].isObject(value) && _utils2['default'].isObject(schemaLevel[key])) {
	        _stripNonSchemaAttrs(value, schemaLevel[key]);
	      }
	    } else {
	      _utils2['default'].unset(attrs, key);
	    }
	  });
	}

	exports['default'] = Schema;
	module.exports = exports['default'];

/***/ }
/******/ ])
});
;