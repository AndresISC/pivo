var { Settlement, SettlementCategory } = require('../models')
var { Response, ApiError } = require('../models/Response')
var imageUtils = require('../utils/ImageUtils')

function getSettlements(req, res){
  Settlement.seek(req)
  .then(e => {
    res.json(e)
  })
  .catch(e => {
    console.log(e);
    res.send(e)
  })
}

function prepareForSave(req, res, next){
  if(req.files){
    var imageName = imageUtils.generateImageName('settlement')
    req.body.image = imageName
  }

  next()
}

function postSettlement(req, res){

  var settlement = Settlement.build(req.body)
  if (req.body.categoryId){
    var category = SettlementCategory.build({ id: req.body.categoryId })
    settlement.setCategory(category, {save:false})
  }

  settlement.save()
  .then( settlement => {
    if(req.files){
      imageUtils.saveImage(req, 'settlements')
      .then(_ => {
        var response = Response.createOkResponse("Successful settlement creation", {settlement: settlement})
        res.status(201).send(response)
      })
      .catch(err => {
        console.log(err);
        var response = Response.createServerErrorResponse()
        res.status(501).send(response)
      })
    }else{
      var response = Response.createOkResponse("Successful settlement creation", {settlement: settlement})
      res.status(201).send(response)
    }
  })
  .catch( err => {
    console.log(err);
    var response = Response.createErrorResponse("Validation failed", err)
    res.status(422).send(response)
  })
}

function deleteSettlement(req, res){
  var params = req.params
  Settlement.findById(req.params.id)
  .then(settlement => {
    if (settlement){
      settlement.destroy()
      .then(_ => {
        var response = Response.createOkResponse("Successful deleted", {deleted: 1})
        res.status(201).send(response)
      })
      .catch(err => {
        console.log(err);
        var response = Response.createServerErrorResponse()
        res.status(501).send(response)
      })
    }else{
      var response = Response.createOkResponse("Successful deleted", {deleted: 0})
      res.status(201).send(response)
    }
  })
  .catch(err => {
    console.log(err);
    var response = Response.createServerErrorResponse()
    res.status(501).send(response)
  })
}

module.exports = {
  getSettlements,
  postSettlement,
  deleteSettlement,

  prepareForSave
}
