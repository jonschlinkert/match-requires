/*!
 * match-requires <https://github.com/jonschlinkert/match-requires>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License
 */

'use strict';

require('mocha');
var should = require('should');
var req = require('./');

describe('matchRequires', function () {
  it('should return an array of matching require statements:', function () {
    var actual = req('require(\'a-b-c\');\nvar fooBar = require(\'foo-bar\');');
    actual.should.eql([{
      col: 0,
      line: 1,
      variable: '',
      module: 'a-b-c',
      original: 'require(\'a-b-c\');'
    },
    {
      col: 0,
      line: 2,
      variable: 'fooBar',
      module: 'foo-bar',
      original: 'var fooBar = require(\'foo-bar\');'
    }]);
  });

  it('should ignore statements in code comments:', function () {
    var actual = req('/*require(\'a-b-c\');*/\nvar fooBar = require(\'foo-bar\');', true);
    actual.should.eql([{
      col: 0,
      line: 2,
      variable: 'fooBar',
      module: 'foo-bar',
      original: 'var fooBar = require(\'foo-bar\');'
    }]);
  });

  it('should parse require statements in methods:', function () {
    var actual = req('this.helper(\'copyright\', require(\'helper-copyright\'))');
    actual.should.eql([{
      col: 25,
      line: 1,
      variable: '',
      module: 'helper-copyright',
      original: 'this.helper(\'copyright\', require(\'helper-copyright\'))'
    }]);
  });
});
