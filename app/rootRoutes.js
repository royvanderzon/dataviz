var functions = require('../functions');

module.exports = function(app) {

  app.get('/', functions.check, function(req, res) {

    res.render('home/index');

  });

}
