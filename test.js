'use strict';

require('mocha');
var assert = require('assert');
var match = require('./');

describe('matchRequires', function() {
  it('should return an array of matching require statements', function() {
    var actual = match("require('a-b-c');\nvar fooBar = require('foo-bar');");
    assert.deepEqual(actual, [
      {
        variable: '',
        name: 'a-b-c',
        string: "require('a-b-c');"
      },
      {
        variable: 'fooBar',
        name: 'foo-bar',
        string: "var fooBar = require('foo-bar');"
      }
    ]);
  });

  it('should ignore statements in code comments', function() {
    var actual = match("/*require('a-b-c');*/\nvar fooBar = require('foo-bar');", true);
    assert.deepEqual(actual, [
      {
        variable: 'fooBar',
        name: 'foo-bar',
        string: "var fooBar = require('foo-bar');"
      }
    ]);
  });

  it('should ignore statements in quoted strings', function() {
    assert.deepEqual(match('"require(\'foo\');"'), []);
    assert.deepEqual(match('"require(\'foo\')const foo = require(\'bar\');"'), []);
  });

  it('should parse require statements in methods', function() {
    var actual = match("this.helper('copyright', require('helper-copyright'))");
    assert.deepEqual(actual, [
      {
        variable: '',
        name: 'helper-copyright',
        string: "require('helper-copyright')"
      }
    ]);
  });

  it('should match $', function() {
    var actual = match("const $ = require('helper-copyright')");
    assert.deepEqual(actual, [
      {
        variable: '$',
        name: 'helper-copyright',
        string: "const $ = require('helper-copyright')"
      }
    ]);
  });

  it('should match _', function() {
    var actual = match("const _ = require('helper-copyright')");
    assert.deepEqual(actual, [
      {
        variable: '_',
        name: 'helper-copyright',
        string: "const _ = require('helper-copyright')"
      }
    ]);
  });

  it('should match . in variable names', function() {
    var actual = match("foo.bar = require('helper-copyright')");
    assert.deepEqual(actual, [
      {
        variable: 'foo.bar',
        name: 'helper-copyright',
        string: "foo.bar = require('helper-copyright')"
      }
    ]);
  });
});
