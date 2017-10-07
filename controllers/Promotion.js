var { Promotion, Settlement } = require('../models')
var { Response, ApiError } = require('../models/Response')
var imageUtils = require('../utils/ImageUtils')

function deletePromotion(req, res){
  var params = req.params
  Promotion.destroy({ where: params, individualHooks: true })
  .then(rowsDeleted => {
    var response = Response.createOkResponse("Successful deleted", {deleted: rowsDeleted})
    res.status(201).send(response)
  })
  .catch(err => {
    var response = Response.createServerErrorResponse()
    res.status(501).send(response)
  })
}

function getPromotions(req, res){
  var params = req.params
  const settlement = Settlement.build(params)

  settlement.getPromotions()
  .then(promotions => {
    var response = Response.createOkResponse("Successful retrieval of promotions", promotions)
    res.status(201).send(response)
  })
  .catch(err => {
    console.log(err);
    var response = Response.createServerErrorResponse()
    res.status(501).send(response)
  })
}

function prepareForSave(req, res, next){
  req.body.settlementId = req.params.id
  if(req.files){
    var imageName = imageUtils.generateImageName('promotion')
    req.body.image = imageName
  }

  next()
}

function postPromotion(req, res){

  Promotion.create(req.body)
  .then( promotion => {
    if(req.files){
      imageUtils.saveImage(req, 'promotions')
      .then(_ => {
        var response = Response.createOkResponse("Successful promotion creation", {promotion: promotion})
        res.status(201).send(response)
      })
      .catch(err => {
        console.log(err);
        var response = Response.createServerErrorResponse()
        res.status(501).send(response)
      })
    }else{
      var response = Response.createOkResponse("Successful promotion creation", {promotion: promotion})
      res.status(201).send(response)
    }
  })
  .catch( err => {
    console.log(err);
    var response = Response.createErrorResponse("Validation failed", err)
    res.status(422).send(response)
  })
}

module.exports = {
  deletePromotion,
  postPromotion,
  getPromotions,

  prepareForSave
}
