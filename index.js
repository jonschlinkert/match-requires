/*!
 * match-requires <https://github.com/jonschlinkert/match-requires>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT License
 */

'use strict';

var regex = require('requires-regex');
var stripComments = require('strip-comments');

module.exports = function (str) {
  str = str.replace(/\r/g, '');

  var lines = stripComments(str).split(/\n/g);
  var len = lines.length;
  var i = 0;
  var arr = [];
  var match;

  while (len--) {
    var line = lines[i++];
    if (match = regex().exec(line)) {
      arr = arr.concat({
        line: i,
        variable: match[2] || '',
        module: match[3],
        original: line
      });
    }
  }

  return arr;
};
