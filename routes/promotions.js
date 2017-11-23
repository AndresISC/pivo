var express = require('express');
var auth = require('../passport/auth.js')()
var Promotion = require('../controllers/Promotion.js')
var router = express.Router();

//Authenticate the user whenever he makes a request to any of the next endpoints
router.use(auth.authenticate())
router.delete('/:id',  Promotion.deletePromotion);
router.put('/:id/', Promotion.putPromotion)


module.exports = router;
