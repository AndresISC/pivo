var { User, Settlement } = require('../models')
var { Response, ApiError } = require('../models/Response')

function postFavorite(req, res){
  var user = User.build({ id: req.params.userId })

  user.addFavorite(req.params.settlementId)
  .then(favorite => {
    var response = Response.createOkResponse("Successful favorite creation", {favorite: favorite})
    res.status(201).send(response)
  })
  .catch(err => {
    var response = Response.createErrorResponse("Foreign Key failed", err)
    res.status(422).send(response)
  })
}

function deleteFavorite(req,res){
  var user = User.build({ id: req.params.userId })
  
  user.removeFavorite(req.params.settlementId)
  .then(deleted => {
    var response = Response.createOkResponse("Successfully deleted", {deleted: deleted})
    res.status(201).send(response)
  })
  .catch(err => {
    console.log(err);
    var response = Response.createServerErrorResponse()
    res.status(501).send(response)
  })
}

function getFavorites(req, res){
  var user = User.build(req.params)

  user.getFavorites()
  .then(favorites => {
    var response = Response.createOkResponse("Successful retrieval of favorites", {favorites: favorites})
    res.status(201).send(response)
  })
  .catch(err => {
    console.log(err);
    var response = Response.createServerErrorResponse()
    res.status(501).send(response)
  })
}

module.exports = {
  postFavorite,
  deleteFavorite,
  getFavorites
}
