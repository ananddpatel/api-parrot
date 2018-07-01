let Cage = function() {
  this.data = {};
};

Cage.prototype.set = function(key, val, statusCode) {
  this.data[key] = { val: val, statusCode: statusCode };
};
Cage.prototype.get = function(route) {
  return this.data[route] ? this.data[route] : false;
};
Cage.prototype.cleanFull = function() {
  this.data = {};
};
// need to fix this logic
Cage.prototype.clean = function(route) {
  if (this.get(route)) {
    this.data[route] = undefined;
  }
  return true;
};

Cage.prototype.seedData = function(seed) {
  seed.forEach(item => {
    if (!item.statusCode) {
      item.statusCode = 200;
    }
    this.set(item.route, item.squack, item.statusCode);
  });
};

module.exports = {
  Cage: Cage
};
