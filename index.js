/*!
 * match-requires <https://github.com/jonschlinkert/match-requires>
 *
 * Copyright (c) 2014-2018, Jon Schlinkert.
 * Released under the MIT License.
 */

'use strict';

var re = require('requires-regex');

module.exports = function matchRequires(str, options = {}) {
  if (typeof options === 'boolean' || typeof options === 'function') {
    options = { stripComments: options };
  }

  if (options.stripComments === true) {
    str = require('strip-comments')(str, options);
  }

  if (typeof options.stripComments === 'function') {
    str = options.stripComments(str);
  }

  var matches = [];
  var regex = re();
  let match;

  while ((match = regex.exec(str))) {
    if (!match[4]) continue;
    var tok = { string: match[0].trim(), variable: match[2] || '', name: match[4] };

    Reflect.defineProperty(tok, 'match', {
      enumerable: false,
      value: match
    });

    matches.push(tok);
  }
  return matches;
};
