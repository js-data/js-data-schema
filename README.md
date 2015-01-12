<img src="https://raw.githubusercontent.com/js-data/js-data/master/js-data.png" alt="js-data logo" title="js-data" align="right" width="64" height="64" />

## js-data-schema [![Bower version](https://badge.fury.io/bo/js-data-schema.png)](http://badge.fury.io/bo/js-data-schema) [![NPM version](https://badge.fury.io/js/js-data-schema.png)](http://badge.fury.io/js/js-data-schema)

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

[js-data-schema api](http://www.js-data.io/docs/js-data-schema)

## License
[MIT License](https://github.com/js-data/js-data-schema/blob/master/LICENSE)

Copyright © 2013-2015 Jason Dobry

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
