'use strict';

const suite = require('benchmarked');

suite.run({code: `code/*.js`, fixtures: `fixtures/*.js`})
  .then(stats => console.log(suite.render(stats)))
  .catch(console.error);
