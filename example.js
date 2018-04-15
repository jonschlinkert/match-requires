const matches = require('./');
console.log(matches('require(\'a-b-c\');\nvar fooBar = require(\'foo-bar\');'));
// [ { string: 'require(\'a-b-c\');',
//     variable: '',
//     name: 'a-b-c' },
//   { string: 'var fooBar = require(\'foo-bar\');',
//     variable: 'fooBar',
//     name: 'foo-bar' } ]

console.log(matches('/* require(\'a-b-c\');*/\nvar fooBar = require(\'foo-bar\');', true));
