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
    str = require('strip-comments')(str);
  }

  if (typeof stripComments === 'function') {
    str = stripComments(str);
  }

  var lines = str.split('\n');
  var len = lines.length;
  var i = 0;
  var res = [];
  var re = regex();
  var match;

  while (len--) {
    var line = lines[i++];
    var match = re.exec(line);
    if (match) {
      res.push({
        line: i,
        col: match.index,
        variable: match[1] || '',
        module: match[2],
        original: line
      });
    }
  }

  return res;
};
