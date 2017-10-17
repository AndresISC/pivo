var express = require('express');
var auth = require('../passport/auth.js')()
var Settlement = require('../controllers/Settlement.js')
var Gallery = require('../controllers/Gallery.js')
var Promotion = require('../controllers/Promotion.js')
var SettlementCategory = require('../controllers/SettlementCategory')
var router = express.Router();

//Authenticate the user whenever he makes a request to any of the next endpoints
//router.use(auth.authenticate())

router.get('/', Settlement.getSettlements)
router.post('/', Settlement.postSettlement)
router.delete('/:id', Settlement.deleteSettlement)
router.put('/:id', Settlement.putSettlement)

router.get('/:id/promotions', Promotion.getPromotions)
router.post('/:id/promotions', Promotion.postPromotion)

router.get('/:id/photos', Gallery.getGallery)
router.post('/:id/photos', Gallery.postGallery)


router.get('/categories', SettlementCategory.getCategories)
router.post('/categories', SettlementCategory.postCategory)
router.delete('/categories/:id', SettlementCategory.deleteCategory)
router.put('/categories/:id', SettlementCategory.putCategory)

module.exports = router;
