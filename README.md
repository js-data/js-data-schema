<img src="https://raw.githubusercontent.com/js-data/js-data/master/js-data.png" alt="js-data logo" title="js-data" align="right" width="64" height="64" />

## js-data-schema [![bower version](https://img.shields.io/bower/v/js-data-schema.svg?style=flat-square)](https://www.npmjs.org/package/js-data-schema) [![npm version](https://img.shields.io/npm/v/js-data-schema.svg?style=flat-square)](https://www.npmjs.org/package/js-data-schema) [![Circle CI](https://img.shields.io/circleci/project/js-data/js-data-schema/master.svg?style=flat-square)](https://circleci.com/gh/js-data/js-data-schema/tree/master) [![npm downloads](https://img.shields.io/npm/dm/js-data-schema.svg?style=flat-square)](https://www.npmjs.org/package/js-data-schema) [![License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://github.com/js-data/js-data-schema/blob/master/LICENSE)

__Define and validate rules, datatypes and schemata in Node and in the browser.__

### API Documentation
[Schemator API](http://www.js-data.io/docs/js-data-schema)

### Install

##### Node
`npm install --save js-data-schema`

```js
var Schemator = require('js-data-schema');
```

##### Browser
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

### Getting Started

```js
var schemator = new Schemator();

schemator.defineSchema('Person', {
  name: 'string'
});

var errors = schemator.validateSync('Person', { name: 'John' });

errors; // null

errors = schemator.validateSync('Person', { name: 50043 });

errors; // {
        //   name: [{
        //     rule: 'type',
        //     actual: 'number',
        //     expected: 'string'
        //   }]
        // }
```

### Project Status

__Latest Release:__ [![Latest Release](https://img.shields.io/github/release/js-data/js-data-schema.svg?style=flat-square)](https://github.com/js-data/js-data-schema/releases)

__Status:__

[![Dependency Status](https://img.shields.io/gemnasium/js-data/js-data-schema.svg?style=flat-square)](https://gemnasium.com/js-data/js-data-schema) [![Coverage Status](https://img.shields.io/coveralls/js-data/js-data-schema/master.svg?style=flat-square)](https://coveralls.io/r/js-data/js-data-schema?branch=master) [![Codacity](https://img.shields.io/codacy/e35036d4d2ea4c618a5711f3dd4ba659.svg?style=flat-square)](https://www.codacy.com/public/jasondobry/js-data-schema/dashboard)

__Supported Platforms:__

[![browsers](https://img.shields.io/badge/Browser-Chrome%2CFirefox%2CSafari%2COpera%2CIE%209%2B%2CiOS%20Safari%207.1%2B%2CAndroid%20Browser%202.3%2B-green.svg?style=flat-square)](https://github.com/js-data/js-data)

### API

[js-data-schema api](http://www.js-data.io/docs/js-data-schema)

### Contributing

First, support is handled via the [Mailing List](https://groups.io/org/groupsio/jsdata). Ask your questions there.

When submitting issues on GitHub, please include as much detail as possible to make debugging quick and easy.

- good - Your versions of js-data, js-data-schema, etc, relevant console logs/error, code examples that revealed the issue
- better - A [plnkr](http://plnkr.co/), [fiddle](http://jsfiddle.net/), or [bin](http://jsbin.com/?html,output) that demonstrates the issue
- best - A Pull Request that fixes the issue, including test coverage for the issue and the fix

[Github Issues](https://github.com/js-data/js-data-schema/issues).

#### Pull Requests

1. Contribute to the issue that is the reason you'll be developing in the first place
1. Fork js-data-schema
1. `git clone https://github.com/<you>/js-data-schema.git`
1. `cd js-data-schema; npm install; bower install;`
1. `grunt go` (builds and starts a watch)
1. (in another terminal) `grunt karma:dev` (runs the tests)
1. Write your code, including relevant documentation and tests
1. Submit a PR and we'll review

### License
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
