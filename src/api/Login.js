import axios from 'axios'

function userLogin(params){
  var request = axios.post('http://localhost/users/login', params)
  return request
}

export default{
  userLogin
}
