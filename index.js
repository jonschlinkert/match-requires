/*!
 * match-requires <https://github.com/jonschlinkert/match-requires>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License
 */

'use strict';

var regex = require('requires-regex');

module.exports = function matchRequires(str, stripComments) {
  if (stripComments === true) {
    var strip = require('strip-comments');
    str = strip(str);
  }

  if (typeof stripComments === 'function') {
    str = stripComments(str);
  }

  var lines = str.split('\n');
  var len = lines.length;
  var i = 0;
  var res = [];
  var match;

  while (len--) {
    var line = lines[i++];
    if (match = regex().exec(line)) {
      res.push({
        line: i,
        variable: match[2] || '',
        module: match[3],
        original: line
      });
    }
  }

  return res;
};
