/*!
 * match-requires <https://github.com/jonschlinkert/match-requires>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT License
 */

'use strict';

var regex = require('requires-regex');

module.exports = function (str, stripComments) {
  str = str.replace(/\r/g, '');

  if (stripComments === true) {
    var strip = require('strip-comments');
    str = strip(str);
  }

  if (typeof stripComments === 'function') {
    str = stripComments(str);
  }

  var lines = str.split(/\n/g);
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
