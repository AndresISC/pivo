var express = require('express');
var auth = require('../passport/auth.js')()
var User = require('../controllers/User.js')
var bodyParser = require('body-parser');
var router = express.Router();

//The next endpoints doesn't require any authentication yet
router.get('/',User.getUsers);
router.post('/', User.postUser)
router.post('/login', User.login)


module.exports = router;