var express = require('express');
var auth = require('../passport/auth')()
var User = require('../controllers/User')
var Favorites = require('../controllers/Favorites')
var bodyParser = require('body-parser');
var router = express.Router();

//The next endpoints don't require any authentication yet
router.get('/',User.getUsers);
router.post('/', User.prepareForSave, User.postUser)
router.delete('/:id', User.deleteUser)

router.post('/login', User.login)

router.get('/:id/favorites', Favorites.getFavorites)
router.post('/:userId/favorites/:settlementId', Favorites.postFavorite)
router.delete('/:userId/favorites/:settlementId', Favorites.deleteFavorite)

module.exports = router;
