# karma-haml-coffee-preprocessor

> Preprocessor to compile haml coffee templates on the fly.

## Installation

The easiest way is to keep `karma-haml-coffee-preprocessor` as a devDependency in your `package.json`.
```json
{
  "devDependencies": {
    "karma": "~0.10",
    "karma-haml-coffee-preprocessor": "~0.1"
  }
}
```

You can simple do it by:
```bash
npm install karma-haml-coffee-preprocessor --save-dev
```

## Configuration
Following code shows the default configuration...
```js
// karma.conf.js
module.exports = function(config) {
  config.set({
    preprocessors: {
      '**/*.hamlc': ['hamlc']
    },

    coffeePreprocessor: {
      // options passed to the haml-coffee compiler
      options: {
        namespace: "window.JST",
        logicalMountPoint: "templates"
      },
      // Removes base and sprockets until logicalMountPath with options.logicalPathStrip
      transformLogicalPath: function(filepath) {
        var logicalPath = filepath.replace(/\.jst.hamlc/, '');
        return logicalPath.substring(logicalPath.indexOf(options.logicalMountPoint));
      }
    }
  });
};
```

----

For more information on Karma see the [homepage].


[homepage]: http://karma-runner.github.com

