var through = require('through'),
    CoffeeScript = require('coffee-script');

require('coffee-script/register');

var HamlCompiler = require('haml-coffee/src/haml-coffee');

/**
* Browserify plugin to convert haml-coffee (.hamlc) templates to Javascript.
*
* Example:
*
* $ browserify -t haml-coffee-browserify foo.hamlc > bundle.js
*
**/
var hamlcPreprocessor = function(args, config, logger, helper) {
  config = config || {};
  var log = logger.create('preprocessor.haml');

  /**
* HamlCoffeeBrowserify.process(file)
* - file (String)
*
* Process the haml-coffee template.
**/
  return function (content, file, done) {
    log.debug('Processing "%s".', file.originalPath);
    var source = '',
        stream;

    if (!(/\.(haml|hamlc)$/).test(file)) {
      return through();
    }

    // save a file chunk
    function write (chunk) {
      source += chunk.toString();
    }

    // end the process
    function end () {
      var options = {},
          compiler = new HamlCompiler(options),
          template,
          compiled;

      compiler.parse(source);

      template = CoffeeScript.compile(compiler.render());
      //template = CoffeeScript.compile(
      //  compiler.precompile(),
      //  {
      //    bare: true
      //  }
      //);

      //compiled = "module.exports = function(options) {\n" +
      //  "return (function() {\n" +
      //  template + "\n" +
      //  "}).call(options)\n" +
      //  "};";

      //stream.queue(compiled);
      stream.queue(template);

      stream.queue(null);
    }

    stream = through(write, end);


    done(eval(stream));
  };

};

module.exports = {'hamlcPreprocessor': hamlcPreprocessor};
