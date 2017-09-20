var express = require('express');
var auth = require('../passport/auth.js')()
var SettlementType = require('../controllers/SettlementType.js')
var router = express.Router();

/* GET users listing. */
router.get('/', auth.authenticate(), SettlementType.getSettlementTypes);

module.exports = router;
