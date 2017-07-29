var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET users listing. */
// actual routing going on that is why only '/'
// has been defined in app.js
router.get('/users', function(req, res, next) {
  res.send('respond with a resource');
});

// add subroutes
router.get('/users/detail', function(req,res,next) {
  res.send('detail');
});

module.exports = router;
