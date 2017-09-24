var express = require('express');
var auth = require('../passport/auth.js')()
var SettlementType = require('../controllers/SettlementType.js')
var router = express.Router();

//Authenticate the user whenever he makes a request to any of the next endpoints
router.use(auth.authenticate())

router.get('/', SettlementType.getSettlementTypes);

module.exports = router;
