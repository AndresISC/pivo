var { SettlementCategory } = require('../models')
var { Response, ApiError } = require('../models/Response')

function getCategories(req, res){
  SettlementCategory.findAll()
  .then(categories => {
    var response = Response.createOkResponse("Successful retrieval of settlement categories", {categories: categories})
    res.status(201).send(response)
  })
  .catch(err => {
    var response = Response.createServerErrorResponse()
    res.status(501).send(response)
  })
}

function deleteCategory(req, res){
  var params = req.params
  SettlementCategory.destroy({ where: params, individualHooks: true })
  .then(rowsDeleted => {
    var response = Response.createOkResponse("Successful deleted", {deleted: rowsDeleted})
    res.status(201).send(response)
  })
  .catch(err => {
    var response = Response.createServerErrorResponse()
    res.status(501).send(response)
  })
}

function postCategory(req, res){

}

module.exports = {
  getCategories,
  postCategory,
  deleteCategory

}
