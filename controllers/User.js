var jwt = require('jsonwebtoken');
var { User } = require('../models')
var { Response, ApiError } = require('../models/Response')
var fileManager = require('./FileManager')
var shortid = require('shortid');
var path = require('path')

function login(req, res){
  console.log(req.body);
  const body = req.body
  const email = body.email
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
  //If the request contains an avatar image file, then generate a random unique name for it
  if(req.files){
    var imageName = 'user-' + shortid.generate() + '.jpg'
    req.body.avatarPath = imageName
  }

  //Store the new user in the database
  User.create(req.body)
  .then( user => {
    //If the request contains an avatar image file, then save it in the public/images/users folder
    if(req.files){
      fileManager.save(req.files.image,
                       req.body.avatarPath,
                       path.join(__dirname, "../public/images/users"))
      .then(_ => {
        var response = Response.createOkResponse("Successful user creation", {user: user})
        res.status(201).send(response)
      })
      .catch(err => {
        var response = Response.createServerErrorResponse()
        res.status(501).send(response)
      })
    }else{
      var response = Response.createOkResponse("Successful user creation", {user: user})
      res.status(201).send(response)
    }
  })
  .catch( err => {
    var response = Response.createErrorResponse("Validation failed", err.errors)
    res.status(422).send(response)
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
  getUsers,
  login
}
