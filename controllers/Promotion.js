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

function postPromotion(req, res){

  var settlement = Settlement.build(req.params)
  var promotion = Promotion.build(req.body)

  promotion.setSettlement(settlement, {save:false})
  promotion.save({files: req.files})
  .then(promotion => {
    var response = Response.createOkResponse("Successful promotion creation", {promotion: promotion})
    res.status(201).send(response)
  })
  .catch( err => {
    console.log(err);
    var response = Response.createErrorResponse("Foreign Key failed", err)
    res.status(422).send(response)
  })
}

function putPromotion(req, res){
  var promotion = Promotion.findById(req.params.id)
  .then(promotion => {
    return promotion.update(req.body, {files: req.files})
  })
  .then(c => {
    res.send(c)
  })
  .catch(err => {
    console.log(err);
    res.send(err)
  })
}

module.exports = {
  deletePromotion,
  postPromotion,
  getPromotions,
  putPromotion
}
