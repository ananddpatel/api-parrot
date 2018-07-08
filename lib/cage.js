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
Cage.prototype.set = function(key, val, options) {
  this.data[key] = {
    val: val,
    statusCode: options.statusCode ? options.statusCode : 200,
    disabled: options.disabled ? options.disabled : false,
    group: options.group ? options.group : null,
    alias: options.alias ? options.alias : key
  };
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
 * Disables a single route
 * @param {string} routes route to disable
 */
Cage.prototype.disable = function(route) {
  let toDisable = this.get(route);
  if (toDisable && !toDisable.disabled) {
    toDisable.disabled = true;
  }
};

/**
 * Enables a single route
 * @param {string} routes route to enable
 */
Cage.prototype.enable = function(route) {
  let toEnable = this.get(route);
  if (toEnable && toEnable.disabled) {
    toEnable.disabled = false;
  }
};

/**
 * Toggles a single route to disable or enable
 * @param {string} routes route to enable
 */
Cage.prototype.toggle = function(route) {
  let toToggle = this.get(route);
  if (toToggle) {
    toToggle.disabled = toToggle.disabled ? false : true;
  }
};

/**
 * Seeds the cage with provided routes and responses
 * @param {array} seed seed data that should be Caged
 */
Cage.prototype.seedData = function(seed) {
  seed.forEach(item => {
    let options = {};
    if (item.statusCode) options['statusCode'] = item.statusCode;
    if (item.disabled) options['disabled'] = item.disabled;
    if (item.alias) options['alias'] = item.alias;
    if (item.group) options['group'] = item.group;
    this.set(item.route, item.squack, options);
  });
};

module.exports = {
  Cage: Cage
};
