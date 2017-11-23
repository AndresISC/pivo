import axios from 'axios'
import { instance } from './Request'

function getUsers(params){
  var request = instance.get('/users', {
    params: params
  })
  return request
}

export default{
  getUsers
}