let path = require('path');
bodyParser = require('body-parser');

var Cage = function() {
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

var cage = new Cage();

var Parrot = function(app) {
  app.use(bodyParser.json());
  app.get('/parrot', function(req, res) {
    res.sendFile(path.join(__dirname + '/parrot-ui/parrot.html'));
  });
  app.get('/parrot/cage', function(req, res) {
    res.send(cage.data);
  });
  app.post('/parrot/set', function(req, res) {
    try {
      cage.set(req.body.path, req.body.squawk, req.body.statusCode);
      res.send(cage.data);
    } catch (error) {
      res.send(JSON.stringify(err));
    }
  });

  app.post('/parrot/clean-full', function(req, res) {
    try {
      res.send(cage.data);
    } catch (error) {
      res.send(JSON.stringify(err));
    }
  });

  app.post('/parrot/clean', function(req, res) {
    try {
      cage.clean(req.body.path);
      res.send(cage.data);
    } catch (error) {
      res.send(JSON.stringify(error));
    }
  });
  return function(req, res, next) {
    const cageData = cage.get(req.url);
    if (cageData) {
      res.status(cageData.statusCode).send(cageData.val);
      res.end();
    } else {
      next();
    }
  };
};

module.exports = {
  Parrot: Parrot
};
