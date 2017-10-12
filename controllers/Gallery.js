var { Gallery, Settlement } = require('../models')
var { Response, ApiError } = require('../models/Response')
var imageUtils = require('../utils/ImageUtils')

function getGallery(req, res){
  var params = req.params
  const settlement = Settlement.build(params)

  settlement.getPhotos()
  .then(photos => {
    var response = Response.createOkResponse("Successful retrieval of photos", photos)
    res.status(201).send(response)
  })
  .catch(err => {
    console.log(err);
    var response = Response.createServerErrorResponse()
    res.status(501).send(response)
  })
}

function deleteGallery(req, res){
  var params = req.params
  Gallery.destroy({ where: params, individualHooks: true })
  .then(rowsDeleted => {
    var response = Response.createOkResponse("Successful deleted", {deleted: rowsDeleted})
    res.status(201).send(response)
  })
  .catch(err => {
    var response = Response.createServerErrorResponse()
    res.status(501).send(response)
  })
}

function postGallery(req, res){
  var settlement = Settlement.build(req.params)
  var photo = Gallery.build(req.body)

  photo.setSettlement(settlement, {save:false})

  photo.save({files: req.files})
  .then( g => {
    var response = Response.createOkResponse("Successful gallery creation", {gallery: g})
    res.status(201).send(response)
  })
  .catch( err => {
    console.log(err);

    var response = Response.createErrorResponse("Foreign Key failed", err)
    res.status(422).send(response)
  })
}

function putGallery(req, res){
  var gallery = Gallery.findById(req.params.id)
  .then(gallery => {
    return gallery.update(req.body, {files: req.files})
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
  deleteGallery,
  postGallery,
  getGallery,
  putGallery
}
