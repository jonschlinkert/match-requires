'use strict';

var fs = require('fs');
var chalk = require('chalk');
var path = require('path');

/**
 * Sanity check.
 */

fs.readdirSync(__dirname + '/code').forEach(function (fp) {
  if (/\.js$/.test(fp)) {
    var fn = require(path.resolve(__dirname, 'code', fp));
    var name = path.basename(fp, path.extname(fp));

    fs.readdirSync(__dirname + '/fixtures').forEach(function (fixture) {
      if (/\.js$/.test(fixture)) {
        fixture = path.resolve(__dirname, 'fixtures', fixture);
        console.log(chalk.bold(name) + ':', fn.apply(null, require(fixture)));
      }
    });
  }
});
