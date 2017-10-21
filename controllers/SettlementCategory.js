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
  SettlementCategory.destroy({ where: req.params, individualHooks: true })
  .then(rowsDeleted => {
    var response = Response.createOkResponse("Successful deleted", {deleted: rowsDeleted})
    res.status(201).send(response)
  })
  .catch(err => {
    var response = Response.createServerErrorResponse()
    res.status(501).send(response)
  })
}

function putCategory(req, res){
  var category = SettlementCategory.findById(req.params.id)
  .then(category => {
    return category.update(req.body, {files: req.files})
  })
  .then(c => {
    res.send(c)
  })
  .catch(err => {
    console.log(err);
    res.send(err)
  })
}

function postCategory(req, res, next){
  SettlementCategory.create(req.body, {files: req.files})
  .then(category => {
    var response = {
      message: "Successful category creation",
      payload: category
    }
    res.status(201).send(response)
  })
  .catch(err => {
    next(err)
  })
}

module.exports = {
  getCategories,
  postCategory,
  deleteCategory,
  putCategory
}
