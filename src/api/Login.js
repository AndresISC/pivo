import axios from 'axios'

function userLogin(params){
  var request = axios.post('http://localhost/users/login', {
    email: params.email,
    password: params.password
  })
  return request
}

export default{
  userLogin
}
