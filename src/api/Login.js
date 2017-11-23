import { instance } from './Request'

function userLogin(params){
  var request = instance.post('/users/login', {
    email: params.email,
    password: params.password
  })
  return request
}

export default{
  userLogin
}
