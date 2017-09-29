import axios from 'axios'

function getUsers(params){
  var request = axios.get('http://localhost/users', {
    params: params
  })
  return request
}

export default{
  getUsers
}
