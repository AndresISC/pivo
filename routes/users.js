var express = require('express');
var auth = require('../passport/auth.js')()
var User = require('../controllers/User.js')
var router = express.Router();

/* GET users listing. */
router.get('/', auth.authenticate(),function(req, res, next) {
  res.send('respond with a resource');
});
router.post('/', User.postUser)


router.post('/login', User.login)

module.exports = router;
