var { SettlementType } = require('../models')
var { Response, ApiError } = require('../models/Response')

function getSettlementTypes(req, res){
  SettlementType.findAll()
  .then(types => {
    var response = Response.createOkResponse("Successful retrieval of settlement types", types)
    res.status(201).send(response)
  })
  .catch(err => {
    var response = Response.createServerErrorResponse()
    res.status(501).send(response)
  })
}

module.exports = {
  getSettlementTypes
}
