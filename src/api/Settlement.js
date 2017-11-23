import axios from 'axios'
import { instance } from './Request'

function getSettlements(params){
  var request = instance.get('/settlements', {
    params: params
  })
  return request
}

function getGallery(settlementId){
  var request = instance.get('/settlements/'+settlementId+'/photos')
  return request
}

function getPromotions(settlementId){
  var request = instance.get('/settlements/'+settlementId+'/promotions')
  return request
}

function deletePhoto(photoId){
  var request = instance.delete('/photos/'+photoId)
  return request
}

function postPhoto(settlementId, photo){
  var formData = new FormData();
  formData.append("image", photo);
  var request = instance.post('/settlements/'+settlementId+'/photos', formData)
  return request
}

function deletePromotion(promotionId){
  var request = instance.delete('/promotions/'+promotionId)
  return request
}

function postPromotion(settlementId, promotion) {
  var formData = new FormData();

  for ( var key in promotion ) {
    if (promotion[key]){
      formData.append(key, promotion[key]);
    }
  }
  var request = instance.post('/settlements/'+settlementId+'/promotions', formData)
  return request
}

function postSettlement(settlement){
  var formData = new FormData();
  for ( var key in settlement ) {
    if(settlement[key]){
      formData.append(key, settlement[key])
    }
  }

  var request = instance.post('/settlements/', formData)
  return request
}

function getCategories(){
  var request = instance.get('/settlements/categories')
  return request
}

function deleteCategory(categoryId){
  var request = instance.delete('/settlements/categories/' + categoryId)
  return request
}

function postCategory(category){
  var formData = new FormData();
  for ( var key in category ) {
    if(category[key]){
      formData.append(key, category[key])
    }
  }

  var request = instance.post('/settlements/categories/', formData)
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
