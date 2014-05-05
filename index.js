
var dotlens = require('dot-lens');

module.exports = function() {
  var cache = {};
  return function(csv) {
    return csv.header().reduce(function(obj, field){
      var lens = cache[field] || (cache[field] = dotlens(field))
      lens.touch(obj)
      lens.set(obj, csv.col(field));
      return obj;
    }, {});
  }
}
