var express = require('express');
var jwt = require('jwt-simple');
var auth = require('../passport/auth.js')()

var router = express.Router();

/* GET users listing. */
router.get('/', auth.authenticate(),function(req, res, next) {
  res.send('respond with a resource');
});

//Testing. DON'T DELETE PLZ >:U
router.get('/login', function(req, res){
  var payload = { id: 1 }
  var token = jwt.encode(payload, process.env.JWT_SECRET)

  res.json({ token: token })
});

module.exports = router;
