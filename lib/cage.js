/**
 * Data structure that stores mock responses.
 */
let Cage = function() {
  this.data = {};
};

/**
 * Sets mock responses in Cage.
 * @param {string} key the url of the mock response
 * @param {object} val the mock response that will be sent
 * @param {number} statusCode the HTTP status code that will be sent along with the response
 */
Cage.prototype.set = function(key, val, statusCode) {
  this.data[key] = { val: val, statusCode: statusCode };
};

/**
 * Gets mock responses in Cage.
 * @param {string} route route to match Caged reoutes
 * @return {object} mock response that should be sent if present
 */
Cage.prototype.get = function(route) {
  return this.data[route] ? this.data[route] : false;
};

/**
 * Cleans the Cage of any data
 */
Cage.prototype.cleanFull = function() {
  this.data = {};
};

// need to fix this logic
/**
 * Clears a single Caged route.
 * @param {string} route Caged route
 */
Cage.prototype.clean = function(route) {
  if (this.get(route)) {
    this.data[route] = undefined;
  }
  return true;
};

/**
 * Seeds the cage with provided routes and responses
 * @param {array} seed seed data that should be Caged
 */
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
