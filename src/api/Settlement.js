import axios from 'axios'

function getSettlements(params){
  var request = axios.get('http://localhost/settlements', {
    params: params
  })
  return request
}

function getGallery(settlementId){
  var request = axios.get('http://localhost/settlements/'+settlementId+'/photos')
  return request
}

function getPromotions(settlementId){
  var request = axios.get('http://localhost/settlements/'+settlementId+'/promotions')
  return request
}

function deletePhoto(photoId){
  var request = axios.delete('http://localhost/photos/'+photoId)
  return request
}

function postPhoto(settlementId, photo){
  var formData = new FormData();
  formData.append("image", photo);
  var request = axios.post('http://localhost/settlements/'+settlementId+'/photos', formData)
  return request
}


export default{
  getSettlements,
  getGallery,
  getPromotions,
  deletePhoto,
  postPhoto
}
