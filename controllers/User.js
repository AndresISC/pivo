var jwt = require('jsonwebtoken');
var { User } = require('../models')
var { Response, ApiError } = require('../models/Response.js')

function login(req, res){
  const body = req.body
  const email = body.email
  User.findOne({ where: {email: email} })
  .then(user => {
    if(user){
      user.isValidPassword(body.password)
      .then(matches => {
        if (matches) {
          var payload = { id: user.id }
          var token = jwt.sign(payload, process.env.JWT_SECRET /*,{ expiresIn: process.env.EXPIRATION_TIME }*/ )

          var response = Response.createOkResponse("Successful login", {token: token})

          res.status(201).send(response)
        }
        else{
          var error = new ApiError("Password didn't match", "authError")
          var response = Response.createErrorResponse("Login failes", {errors: [error]})

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
  User.create(req.body)
  .then( user => {
    var response = Response.createOkResponse("Successful user creation", {user: user})
    res.status(201).send(response)
  })
  .catch( err => {
      var response = Response.createErrorResponse("Validation failed", err.errors)
      res.status(422).send(response)
  })
}

module.exports = {
  postUser,
  login
}
