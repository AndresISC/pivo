import axios from 'axios'

function getSettlements(params){
  var request = axios.get('http://192.168.1.69/settlements', {
    params: params
  })
  return request
}

export default{
  getSettlements
}
