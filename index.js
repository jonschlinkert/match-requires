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
  str = stripComments(str).replace(/\r/g, '');
  var context = [];

  str.split(/\n/g).forEach(function(line, i) {
    line = line.replace(/^\s+/, '');
    i = i + 1;

    if (regex().exec(line)) {
      context.push({
        line: i,
        variable: RegExp.$2,
        module: RegExp.$3,
        original: line
      });
    }
  });
  return context.filter(Boolean);
};
