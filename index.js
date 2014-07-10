var haml = require('haml');

hamlcPreprocessor = require('./lib/haml-coffee-preprocessor');

hamlcPreprocessor.$inject = ['args', 'config', 'logger', 'helper'];

// PUBLISH DI MODULE
module.exports = {
  'preprocessor:hamlc': ['factory', hamlcPreprocessor]
};
