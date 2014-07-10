var CoffeeScript = require('coffee-script');
    path = require('path');

require('coffee-script/register');

var HamlCompiler = require('haml-coffee/src/haml-coffee');

var hamlcPreprocessor = function(args, config, logger, helper) {
  config = config || {};
  var log = logger.create('preprocessor.haml');
  var defaultOptions = {
    logicalPathStrip: "templates",
    namespace: "window.JST"
  };

  var options = helper.merge(defaultOptions, args.options || {}, config.options || {});
  // Removes base and sprockets until logicalMountPath with options.logicalPathStrip
  var transformLogicalPath = function(filepath) {
    var logicalPath = filepath.replace(/\.jst.hamlc/, '');
    // Poor mans solutions here, its somewhat more complex
    return logicalPath.substring(logicalPath.indexOf(options.logicalPathStrip));
  };

  //var makeJST = function (data, file) {
  //  return "(function () { " +
  //    namespace + " || (" + namespace + " = {}); " +
  //    namespace + "[" + JSON.stringify(file.logicalPath) + "] = " +
  //    data.replace(/$(.)/mg, '$1 ').trimLeft().trimRight() +
  //    " }).call(this);";
  //};

  return function (content, file, done) {
    log.debug('Processing "%s".', file.originalPath);
    var opts = helper.merge(options, {name: transformLogicalPath(file.originalPath)});

    var compiler = new HamlCompiler(opts),
        template,
        compiled;

    file.logicalPath = transformLogicalPath(file.originalPath);
    compiler.parse(content);

    try {
      template = CoffeeScript.compile(compiler.render());
    } catch (e) {
      done(e, null)
    }

    done(null, template);
  };

};

module.exports = hamlcPreprocessor;
