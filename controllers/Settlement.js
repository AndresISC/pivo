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

function postSettlement(req, res, next){

  var settlement = Settlement.build(req.body)
  if (req.body.categoryId){
    var category = SettlementCategory.build({ id: req.body.categoryId })
    settlement.setCategory(category, {save:false})
  }

  settlement.save({files: req.files})
  .then( settlement => {
    var response = Response.createOkResponse("Successful settlement creation", {settlement: settlement})
    res.status(201).send(response)
  })
  .catch( err => {
    next(err)
  })
}

function putSettlement(req, res){
  var settlement = Settlement.findById(req.params.id)
  .then(settlement => {
    return settlement.update(req.body, {files: req.files})
  })
  .then(c => {
    res.send(c)
  })
  .catch(err => {
    console.log(err);
    res.send(err)
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
    next(err)
  })
}

module.exports = {
  getSettlements,
  postSettlement,
  deleteSettlement,
  putSettlement
}
