var express = require('express');
var auth = require('../passport/auth.js')()
var User = require('../controllers/User.js')

var router = express.Router();

router.post('/login', User.login)


//router.use(auth.authenticate())

router.post('/', User.postUser)
router.get('/',function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
