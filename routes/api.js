var express = require('express');
var router = express.Router();

var request = require('request');
/* GET users listing. */
router.get('/test', function(req, res, next) {
	request('http://localhost:3000/posts', function (error, response, body) {
		res.json({test: body});
	})
	
  
});

module.exports = router;
