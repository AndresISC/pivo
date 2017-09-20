var express = require('express');
var auth = require('../passport/auth.js')()
var Promotion = require('../controllers/Promotion.js')
var router = express.Router();

/* GET users listing. */
router.delete('/:id', auth.authenticate(), Promotion.deletePromotion);

module.exports = router;
