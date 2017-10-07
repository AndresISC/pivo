var { Settlement } = require('../models')
var { Response, ApiError } = require('../models/Response')
var fileManager = require('./FileManager')
var shortid = require('shortid');
var path = require('path')

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

function postSettlement(req, res){
  //If the request contains an avatar image file, then generate a random unique name for it
  if(req.files){
    var imageName = 'settlement-' + shortid.generate() + '.jpg'
    req.body.image = imageName
  }

  //Store the new user in the database
  Settlement.create(req.body)
  .then( settlement => {
    //If the request contains an avatar image file, then save it in the public/images/users folder
    if(req.files){
      fileManager.save(req.files.image,
                       req.body.image,
                       path.join(__dirname, "../public/images/settlements"))
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
  deleteSettlement
}
