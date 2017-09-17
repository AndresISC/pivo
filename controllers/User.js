const { user } = require('../models')
module.exports = {
  postUser: function(req, res){
    user.create(req.body)
    .then( user => {
      res.status(201).json(user)
    })
    .catch( err => {
      res.status(501).json(err)
    })
  }
}
