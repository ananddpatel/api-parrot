let _cage = require('./cage');
let path = require('path');
let bodyParser = require('body-parser');

/**
 * Parrot mock service to mock api responses.
 * @param {object} app express app
 * @param {object} options options for parrot
 */
let Parrot = function(app, options = {}) {
  this.cage = new _cage.Cage();
  app.use(bodyParser.json());
  parrotRoutesSetup(app, this.cage);
  if (options.seed) {
    this.cage.seedData(options.seed);
  }
  return middleWare(this.cage);
};

/**
 * Route setup for Parrot UI and use.
 * @param {object} app express app
 * @param {Cage} cage Parrot Cage that stores endpoints and mock responses
 */
function parrotRoutesSetup(app, cage) {
  app.get('/parrot', getParrotUI);
  app.get('/parrot/cage', getParrotCage(cage));
  app.post('/parrot/set', setReqResInCage(cage));
  app.post('/parrot/clean-full', cleanFullCage(cage));
  app.post('/parrot/clean', cleanSingleRoute(cage));
}

/**
 * Gets Parrot UI
 * @param {object} req request
 * @param {object} res response
 */
function getParrotUI(req, res) {
  res.sendFile(path.join(__dirname + '/parrot-ui/parrot.html'));
}

/**
 * Gets the Parrot Cage
 * @param {object} req request
 * @param {object} res response
 */
let getParrotCage = function(cage) {
  return function(req, res) {
    res.send(cage.data);
  };
};

/**
 * Gets the request route and response in cage.
 * @param {object} req request
 * @param {object} res response
 */
let setReqResInCage = function(cage) {
  return function(req, res) {
    try {
      cage.set(req.body.route, req.body.squawk, req.body.statusCode);
      res.send(cage.data);
    } catch (error) {
      res.send(JSON.stringify(err));
    }
  };
};

/**
 * Cleans the Cage of all request and responses.
 * @param {object} req request
 * @param {object} res response
 */
let cleanFullCage = function(cage) {
  return function(req, res) {
    try {
      res.send(cage.data);
    } catch (error) {
      res.send(JSON.stringify(err));
    }
  };
};

/**
 * Cleans the Cage of a single route
 * @param {object} req request
 * @param {object} res response
 */
let cleanSingleRoute = function(cage) {
  return function(req, res) {
    try {
      cage.clean(req.body.route);
      res.send(cage.data);
    } catch (error) {
      res.send(JSON.stringify(error));
    }
  };
};

/**
 * Main middleware function logic that the express server will use to see if there are any mock responses to send based on request url
 * @param {Cage} cage Parrot Cage
 */
function middleWare(cage) {
  return function(req, res, next) {
    const cageData = cage.get(req.url);
    if (cageData) {
      res.status(cageData.statusCode).send(cageData.val);
      res.end();
    } else {
      next();
    }
  };
}

module.exports = {
  Parrot: Parrot
};
