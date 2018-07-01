let Cage = function() {
  this.data = {};
};

Cage.prototype.set = function(key, val, statusCode) {
  this.data[key] = { val: val, statusCode: statusCode };
};
Cage.prototype.get = function(path) {
  return this.data[path] ? this.data[path] : false;
};
Cage.prototype.cleanFull = function() {
  this.data = {};
};
// need to fix this logic
Cage.prototype.clean = function(path) {
  if (this.get(path)) {
    this.data[path] = undefined;
  }
  return true;
};

module.exports = {
  Cage: Cage
};
