var { Settlement } = require('../models')
var { Response, ApiError } = require('../models/Response')

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

module.exports = {
  getPromotions
}
