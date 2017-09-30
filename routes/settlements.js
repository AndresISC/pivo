var express = require('express');
var auth = require('../passport/auth.js')()
var Settlement = require('../controllers/Settlement.js')
var router = express.Router();

//Authenticate the user whenever he makes a request to any of the next endpoints
//router.use(auth.authenticate())

router.get('/', Settlement.getSettlements)
router.get('/:id/promotions', Settlement.getPromotions)
router.post('/', Settlement.postSettlement)

module.exports = router;
