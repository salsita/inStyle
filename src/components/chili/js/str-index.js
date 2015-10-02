module.exports = function() {
  return function(stylus) {
    stylus.define('str-index', function(substr, str) {
      return new stylus.nodes.Unit(str.string.indexOf(substr.string));
    });
  };
};
