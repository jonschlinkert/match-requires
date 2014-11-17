# match-requires [![NPM version](https://badge.fury.io/js/match-requires.svg)](http://badge.fury.io/js/match-requires)

> Match require statements in a string. Returns an array of matching require statements. Each match is an object with line number, variable name, and module name. Statements in code comments are ignored.

## Install
#### Install with [npm](npmjs.org):

```bash
npm i match-requires --save-dev
```

## Run tests

```bash
npm test
```

## Usage

```js
var re = require('match-requires');
console.log(re('require(\'a-b-c\');\nvar fooBar = require(\'foo-bar\');'))
```

Returns:

```js
[ { line: 1,
    variable: '',
    module: 'a-b-c',
    original: 'require(\'a-b-c\');' },
  { line: 2,
    variable: 'fooBar',
    module: 'foo-bar',
    original: 'var fooBar = require(\'foo-bar\');' } ]
```

## Author

**Jon Schlinkert**
 
+ [github/jonschlinkert](https://github.com/jonschlinkert)
+ [twitter/jonschlinkert](http://twitter.com/jonschlinkert) 

## License
Copyright (c) 2014 Jon Schlinkert, contributors.  
Released under the MIT license

***

_This file was generated by [verb-cli](https://github.com/assemble/verb-cli) on September 20, 2014._