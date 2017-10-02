import axios from 'axios'

function getSettlements(params){
  var request = axios.get('http://localhost/settlements', {
    params: params
  })
  return request
}

export default{
  getSettlements
}
