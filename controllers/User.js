var jwt = require('jsonwebtoken');
var { User } = require('../models')
var { Response, ApiError } = require('../models/Response')
var imageUtils = require('../utils/ImageUtils')

function login(req, res){
  const body = req.body
  const email = body.email
  console.log(body)
  //Find a user with the submitted email
  User.findOne({ where: {email: email} })
  .then(user => {
    if(user){
      //Compare the user's password with the submitted password
      user.isValidPassword(body.password)
      .then(matches => {
        //If the passwords match, then send an authentication token to the user
        if (matches) {
          //The payload of the token will only contain the user id
          var payload = { id: user.id }
          //Sign the token with the secret word
          //Optionally, specifiy an expiration time too
          var token = jwt.sign(payload, process.env.JWT_SECRET /*,{ expiresIn: process.env.EXPIRATION_TIME }*/ )

          var response = Response.createOkResponse("Successful login", {token: token})
          res.status(201).send(response)
        }
        else{
          var error = new ApiError("Passwords didn't match", "authError")
          var response = Response.createErrorResponse("Login failed", {errors: [error]})
          res.status(401).send(response)
        }
      })
      .catch(err => {
        var response = Response.createServerErrorResponse()
        res.status(501).send(response)
      })
    }else{
      var error = new ApiError("User not found", "authError")
      var response = Response.createErrorResponse("Login failed", {errors: [error]})
      res.status(401).send(response)
    }
  })
  .catch(err => {
    var response = Response.createServerErrorResponse()
    res.status(501).send(response)
  })
}

function postUser(req, res){
  //Store the new user in the database
  User.create(req.body, {files: req.files})
  .then( user => {
    var response = Response.createOkResponse("Successful user creation", {user: user})
    res.status(201).send(response)
  })
  .catch( err => {
    console.log(err);
    var response = Response.createErrorResponse("Validation failed", err)
    res.status(422).send(response)
  })
}

function putUser(req, res){
  var user = User.findById(req.params.id)
  .then(user => {
    return user.update(req.body, {files: req.files})
  })
  .then(c => {
    res.send(c)
  })
  .catch(err => {
    console.log(err);
    res.send(err)
  })
}

function deleteUser(req, res){
  var params = req.params
  User.destroy({ where: params, individualHooks: true })
  .then(rowsDeleted => {
    var response = Response.createOkResponse("Successful deleted", {deleted: rowsDeleted})
    res.status(201).send(response)
  })
  .catch(err => {
    var response = Response.createServerErrorResponse()
    res.status(501).send(response)
  })
}

function getUsers(req, res){
  User.seek(req)
  .then(e => {
    res.json(e)
  })
  .catch(e => {
    console.log(e);
    res.send(e)
  })
}

module.exports = {
  postUser,
  deleteUser,
  getUsers,
  putUser,
  login
}
