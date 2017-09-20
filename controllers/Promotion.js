var { Promotion, Settlement } = require('../models')
var { Response, ApiError } = require('../models/Response')

function deletePromotion(req, res){
  var params = req.params
  Promotion.destroy({ where: params })
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
  deletePromotion
}
