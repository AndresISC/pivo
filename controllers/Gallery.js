var { Gallery } = require('../models')
var { Response, ApiError } = require('../models/Response')

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

module.exports = {
  deleteGallery
}
