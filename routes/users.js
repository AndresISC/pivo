var express = require('express');
var auth = require('../passport/auth.js')()
var User = require('../controllers/User.js')
var router = express.Router();

//The next endpoints doesn't require any authentication yet

router.post('/login', User.login)

router.post('/', User.postUser)
router.get('/',function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
