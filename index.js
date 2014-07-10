hamlcPreprocessor = require('./lib/haml-coffee-preprocessor');

hamlcPreprocessor.$inject = ['args', 'config.hamlcPreprocessor', 'logger', 'helper'];

// PUBLISH DI MODULE
module.exports = {
  'preprocessor:hamlc': ['factory', hamlcPreprocessor]
};
