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

function deletePromotion(promotionId){
  var request = axios.delete('http://localhost/promotions/'+promotionId)
  return request
}

function postPromotion(settlementId, promotion) {
  var formData = new FormData();

  for ( var key in promotion ) {
    if (promotion[key]){
      formData.append(key, promotion[key]);
    }
  }
  var request = axios.post('http://localhost/settlements/'+settlementId+'/promotions', formData)
  return request
}

function postSettlement(settlement){
  var formData = new FormData();
  for ( var key in settlement ) {
    if(settlement[key]){
      formData.append(key, settlement[key])
    }
  }

  var request = axios.post('http://localhost/settlements/', formData)
  return request
}

function getCategories(){
  var request = axios.get('http://localhost/settlements/categories')
  return request
}

function deleteCategory(categoryId){
  var request = axios.delete('http://localhost/settlements/categories/' + categoryId)
  return request
}

function postCategory(category){
  var formData = new FormData();
  for ( var key in category ) {
    if(category[key]){
      formData.append(key, category[key])
    }
  }

  var request = axios.post('http://localhost/settlements/categories/', formData)
  return request
}

export default{
  getSettlements,
  getGallery,
  getPromotions,
  deletePhoto,
  postPhoto,
  deletePromotion,
  postPromotion,
  postSettlement,
  getCategories,
  deleteCategory,
  postCategory
}
