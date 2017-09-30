import axios from 'axios'

function getUsers(params){
  var request = axios.get('http://192.168.1.69/users', {
    params: params
  })
  return request
}

export default{
  getUsers
}
