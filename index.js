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
  str = stripComments(str).split(/\n/g);

  return str.reduce(function (acc, line, i) {
    if (regex().exec(line)) {
      acc.push({
        line: i + 1,
        variable: RegExp.$2,
        module: RegExp.$3,
        original: line
      });
    }
    return acc;
  }, []);
};
