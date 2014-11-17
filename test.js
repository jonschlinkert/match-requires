/*!
 * match-requires <https://github.com/jonschlinkert/match-requires>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT License
 */

'use strict';

var should = require('should');
var req = require('./');

describe('matchRequires', function () {
  it('should return an array of matching require statements:', function () {
    var actual = req('require(\'a-b-c\');\nvar fooBar = require(\'foo-bar\');');
    actual.should.eql([{
      line: 1,
      variable: '',
      module: 'a-b-c',
      original: 'require(\'a-b-c\');'
    },
    {
      line: 2,
      variable: 'fooBar',
      module: 'foo-bar',
      original: 'var fooBar = require(\'foo-bar\');'
    }]);
  });

  it('should ignore statements in code comments:', function () {
    var actual = req('/*require(\'a-b-c\');*/\nvar fooBar = require(\'foo-bar\');');
    actual.should.eql([{
      line: 1,
      variable: 'fooBar',
      module: 'foo-bar',
      original: 'var fooBar = require(\'foo-bar\');'
    }]);
  });
});