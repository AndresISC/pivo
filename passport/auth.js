const passport = require('passport')
const passportJWT = require('passport-jwt')
const { user } = require('../models/')

const ExtractJwt = passportJWT.ExtractJwt
const Strategy = passportJWT.Strategy

const params = {
  //Secrete used to sign the token.
  secretOrKey: process.env.JWT_SECRET,

  //Specify where the token should be extracted from a request.
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('auth')
}

module.exports = function(){
  const strategy = new Strategy(params, function(payload, next){
    //Check if the user exists in the database
    user.findById(payload.id)
      .then( user => {
        if (user){
          return next(null, user)
        }else{
          return next(null, false)
        }
      })
      .catch( err => {
        return next(err)
      })
  })

  passport.use(strategy)

  return{
    initialize: function(){
      return passport.initialize()
    },
    authenticate: function(){
      return passport.authenticate("jwt", { session: false })
    }
  }
}
