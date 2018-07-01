let _cage = require('./cage');
let path = require('path');
let bodyParser = require('body-parser');

let Parrot = function(app) {
  let cage = new _cage.Cage();
  app.use(bodyParser.json());
  parrotRoutesSetup(app, cage);
  cage;
  return middleWare(cage);
};

function parrotRoutesSetup(app, cage) {
  app.get('/parrot', function(req, res) {
    res.sendFile(path.join(__dirname + '/parrot-ui/parrot.html'));
  });
  app.get('/parrot/cage', function(req, res) {
    res.send(cage.data);
  });
  app.post('/parrot/set', function(req, res) {
    try {
      cage.set(req.body.route, req.body.squawk, req.body.statusCode);
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
      cage.clean(req.body.route);
      res.send(cage.data);
    } catch (error) {
      res.send(JSON.stringify(error));
    }
  });
}

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
