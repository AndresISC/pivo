import axios from 'axios'

function getSettlements(params){
  var request = axios.get('http://localhost/settlements', {
    params: params
  })
  return request
}

function getGallery(settlementId){
  var request = axios.get('http://localhost/settlements/'+settlementId+'/gallery')
  return request
}

function getPromotions(settlementId){
  var request = axios.get('http://localhost/settlements/'+settlementId+'/promotions')
  return request
}

export default{
  getSettlements,
  getGallery,
  getPromotions
}
