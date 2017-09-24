const passport = require('passport')
const passportJWT = require('passport-jwt')
const { User } = require('../models/')

const ExtractJwt = passportJWT.ExtractJwt
const Strategy = passportJWT.Strategy

const params = {
  //Secret word used to code/decode the token.
  secretOrKey: process.env.JWT_SECRET,

  //Specify where the token should be extracted from a request.
  //In this specific case, it must be sent in the Authorization Header with the 'auth' word before it.
  //Example: auth xxxxxxxx.yyyyyyyy.zzzzzzzz
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('auth')
}

module.exports = function(){
  //Strategy used to authenticate the user with the token he MUST provide in the Authorization header
  const strategy = new Strategy(params, function(payload, next){
    //Check if the user id contained in the payload of the token exists in the database
    User.findById(payload.id)
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
    //Initialize the Passport module
    initialize: function(){
      return passport.initialize()
    },
    //Call this function as a middleware whenever you want to authenticate the user
    authenticate: function(){
      return passport.authenticate("jwt", { session: false })
    }
  }
}
