var { Gallery, Settlement } = require('../models')
var { Response, ApiError } = require('../models/Response')

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
  req.body.settlementId = req.params.id
  if(req.files){
    var imageName = 'gallery-' + shortid.generate() + '.jpg'
    req.body.image = imageName
  }

  Gallery.create(req.body)
  .then( gallery => {
    if(req.files){
      fileManager.save(req.files.image,
                       req.body.image,
                       path.join(__dirname, "../public/images/gallery"))
      .then(_ => {
        var response = Response.createOkResponse("Successful gallery creation", {gallery: gallery})
        res.status(201).send(response)
      })
      .catch(err => {
        console.log(err);
        var response = Response.createServerErrorResponse()
        res.status(501).send(response)
      })
    }else{
      var response = Response.createOkResponse("Successful gallery creation", {gallery: gallery})
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
  deleteGallery,
  postGallery,
  getGallery
}
