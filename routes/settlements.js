var express = require('express');
var auth = require('../passport/auth.js')()
var Settlement = require('../controllers/Settlement.js')
var router = express.Router();

router.get('/:id/promotions', auth.authenticate(), Settlement.getPromotions)

module.exports = router;
