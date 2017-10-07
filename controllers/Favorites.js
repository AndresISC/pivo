var { User } = require('../models')
var { Response, ApiError } = require('../models/Response')

function postFavorite(req, res){
  var user = User.build(req.params)
  user.addFavorites(req.body)
  .then(favorite => {
    var response = Response.createOkResponse("Successful favorite creation", {favorite: favorite})
    res.status(201).send(response)
  })
  .catch(err => {
    console.log(err);
    var response = Response.createServerErrorResponse()
    res.status(501).send(response)
  })
}

function deleteFavorite(req,res){

}

function getFavorites(req, res){
  var user = User.build(req.params)

  try{

    user.getFavorites()
    .then(favorites => {
      console.log("success");
      var response = Response.createOkResponse("Successful retrieval of favorites", {favorites: favorites})
      res.status(201).send(response)
    })
    .catch(err => {
      console.log("err");
      var response = Response.createServerErrorResponse()
      res.status(501).send(response)
    })
  }catch(err){
    console.log(err);
  }

}

module.exports = {
  postFavorite,
  deleteFavorite,
  getFavorites
}
