var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'app' });
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'login' });
});

router.get('/wechat', function(req, res, next) {
  res.render('index', { title: 'app' });
});
router.get('/wechat/*', function(req, res, next) {
  res.render('index', { title: 'app' });
});

module.exports = router;
