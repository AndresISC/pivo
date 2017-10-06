var express = require('express');
var auth = require('../passport/auth.js')()
var Gallery = require('../controllers/Gallery.js')
var router = express.Router();

//Authenticate the user whenever he makes a request to any of the next endpoints
//router.use(auth.authenticate())

router.delete('/:id',  Gallery.deleteGallery);


module.exports = router;
