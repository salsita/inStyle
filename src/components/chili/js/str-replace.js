module.exports = function() {
  return function(stylus) {
    stylus.define('str-replace', function(repl, substr, str) {
      return new stylus.nodes.Unit(str.string.replace(repl.string, substr.string));
    });
  };
};
