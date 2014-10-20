## js-data-schema

__Define and validate rules, datatypes and schemata in Node and in the browser.__

## API Documentation
[Schemator API](http://www.js-data.io/docs/js-data-schema)

## Install

#### Node
`npm install --save js-data-schema`

```js
var Schemator = require('js-data-schema');
```

#### Browser
`npm install --save js-data-schema` or `bower install --save js-data-schema`

Load `js-data-schema/dist/js-data-schema.js` into your browser.

```js
// global constructor if you're not using AMD or CommonJS
window.Schemator;

// AMD
define(['js-data-schema'], function (Schemator) { ... })

// CommonJS
var Schemator = require('js-data-schema');
```

## Getting Started

```js
var schemator = new Schemator();

schemator.defineSchema('Person', {
  name: 'string'
});

var errors = schemator.validateSync('Person', { name: 'John' });

errors; // null

errors = schemator.validateSync('Person', { name: 50043 });

errors; // {
              rule: 'type',
              actual: 'number',
              expected: 'string'
            }
```

## Status

| Branch | Master |
| ------ | ------ |
| Bower | [![Bower version](https://badge.fury.io/bo/js-data-schema.png)](http://badge.fury.io/bo/js-data-schema) |
| NPM | [![NPM version](https://badge.fury.io/js/js-data-schema.png)](http://badge.fury.io/js/js-data-schema) |
| Build Status | [![Build Status](https://travis-ci.org/js-data/js-data-schema.png?branch=master)](https://travis-ci.org/js-data/js-data-schema) |
| Code Climate | [![Code Climate](https://codeclimate.com/github/js-data/js-data-schema.png)](https://codeclimate.com/github/js-data/js-data-schema) |
| Dependency Status | [![Dependency Status](https://gemnasium.com/js-data/js-data-schema.png)](https://gemnasium.com/js-data/js-data-schema) |
| Coverage | [![Coverage Status](https://coveralls.io/repos/js-data/js-data-schema/badge.png?branch=master)](https://coveralls.io/r/js-data/js-data-schema?branch=master) |

## API

### Schemator

#### Schemator()
```js
var schemator = new Schemator();
```

#### Schemator#availableDataTypes()
```js
schemator.availableDataTypes(); // ['boolean', 'string', 'etc.']
```

#### Schemator#availableRules()
```js
schemator.availableRules(); // ['type', 'minLength', 'etc.']
```

#### Schemator#availableSchemata()
```js
schemator.defineSchema('PersonSchema', { ... });
schemator.availableSchemata(); // ['PersonSchema']
```

#### Schemator#getDataType(name)
```js
schemator.getDataType('myDataType');
```

#### Schemator#getRule(name)
```js
schemator.getRule('myRule');
```

#### Schemator#getSchema(name)
```js
schemator.getSchema('PersonSchema');
```

#### Schemator#removeDataType(name)
```js
schemator.removeDataType('myDataType');
```

#### Schemator#removeRule(name)
```js
schemator.removeRule('myRule');
```

#### Schemator#removeSchema(name)
```js
schemator.removeSchema('PersonSchema');
```

#### Schemator#defineDataType(name, typeDefinition)
```js
schemator.defineDataType('NaN', function (x) {
  if (isNaN(x)) {
    return null;
  } else {
    return {
      rule: 'type',
      actual: typeof x,
      expected: 'NaN'
    };
  }
});
```

#### Schemator#defineRule(name, ruleFunc[, async])
```js
schemator.defineRule('divisibleBy', function (x, divisor) {
  if (typeof x === 'number' && typeof divisor === 'number' && x % divisor !== 0) {
    return {
      rule: 'divisibleBy',
      actual: '' + x + ' % ' + divisor + ' === ' + (x % divisor),
      expected: '' + x + ' % ' + divisor + ' === 0'
    };
  }
  return null;
});

schemator.defineSchema('mySchema', {
  seats: {
    divisibleBy: 4
  }
});

var errors = schemator.getSchema('mySchema').validateSync({
  seats: 16
});

errors; //  null

errors = schemator.getSchema('mySchema').validateSync({
  seats: 17
});

errors; //  {
        //    seats: {
        //      errors: [ {
        //        rule: 'divisibleBy',
        //        actual: '17 % 4 === 1',
        //        expected: '17 % 4 === 0'
        //      } ]
        //    }
        //  }
```

Asynchronous rule:
```js
schemator.defineRule('divisibleBy', function (x, divisor, cb) {
  
  // asynchronity here is fake, but you could do something async, like make an http request
  setTimeout(function () {
    if (typeof x === 'number' && typeof divisor === 'number' && x % divisor !== 0) {
      cb({
        rule: 'divisibleBy',
        actual: '' + x + ' % ' + divisor + ' === ' + (x % divisor),
        expected: '' + x + ' % ' + divisor + ' === 0'
      });
    }
    cb(null);
  }, 1);
}, true); // pass true as the third argument

schemator.defineSchema('mySchema', {
  seats: {
    divisibleBy: 4
  }
});

var errors = schemator.getSchema('mySchema').validate({
  seats: 16
}, function (err) {
  errors; //  null

  errors = schemator.getSchema('mySchema').validate({
    seats: 17
  }, function (err) {
    errors; //  {
            //    seats: {
            //      errors: [ {
            //        rule: 'divisibleBy',
            //        actual: '17 % 4 === 1',
            //        expected: '17 % 4 === 0'
            //      } ]
            //    }
            //  }  
  });
});
```

#### Schemator#defineSchema(name, definition)
```js
schemator.defineSchema('PersonSchema', {
  name: {
    first: {
      type: 'string',
      maxLength: 255
    },
    last: {
      type: 'string',
      maxLength: 255
    }
  },
  age: {
    type: 'number',
    max: 150,
    min: 0
  }
});
```

#### Schemator#validate(schemaName, attrs[, options], cb)
See `Schema#validate(attrs[, options], cb)`

#### Schemator#validateSync(schemaName, attrs[, options])
See `Schema#validateSync(attrs[, options])`

#### Schemator#setDefaults(schemaName, attrs)
See `Schema#setDefaults(attrs)`

#### Schemator#getDefaults()
See `Schema#getDefaults()`

#### Schemator#addDefaultsToTarget(schemaName, target[, overwrite])
See `Schema#addDefaultsToTarget(target)`

#### Schemator#stripNonSchemaAttrs(schemaName, target)
See `Schema#stripNonSchemaAttrs(target)`

### Schema

#### Schema#validate(attrs[, options], cb)
```js
PersonSchema.validate({
  name: 'John Anderson'
}, function (err) {
  err; // null
});

PersonSchema.validate({
  name: 5
}, function (err) {
  err;  //  {
        //    name: {
        //      errors: [{
        //        rule: 'type',
        //        actual: 'number',
        //        expected: 'string'
        //      }]
        //    }
        //  }
});
```

#### Schema#validateSync(attrs[, options])
```js
var errors = PersonSchema.validate({
  name: 'John Anderson'
});

errors; // null

errors = mySchema.validate({
  name: 5
});
errors; //  {
        //    name: {
        //      errors: [{
        //        rule: 'type',
        //        actual: 'number',
        //        expected: 'string'
        //      }]
        //    }
        //  }
```

#### Schema#setDefaults(attrs)
```js
PersonSchema.setDefaults({
  first: '',
  last: '',
  plan: 'free'
});
```

#### Schema#getDefaults()
```js
PersonSchema.getDefaults(); // {
                                 first: '',
                                 last: '',
                                 age: 0
                               }
```

#### Schema#addDefaultsToTarget(target[, overwrite])
```js
var person = {
  first: 'John',
  plan: 'premium'
};

PersonSchema.addDefaultsToTarget(person);
 
person; // {
             first: 'John',
             last: '',
             plan: 'premium'
           }

PersonSchema.addDefaultsToTarget(person, true);
 
person; // {
             first: '',
             last: '',
             plan: 'free'
           }
```

#### Schema#stripNonSchemaAttrs(target)
```js
var person = {
  first: 'John',
  plan: 'premium',
  nonSchema: 'value'
};

PersonSchema.stripNonSchemaAttrs(person);
 
person; // {
             first: 'John',
             plan: 'premium'
           }
```

## License
[MIT License](https://github.com/js-data/js-data-schema/blob/master/LICENSE)

Copyright © 2013-2014 Jason Dobry

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
