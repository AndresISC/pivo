var path = require('path')
var fs = require('fs')
module.exports = {
  generateURL: function(image){
    if(image !== null){
      return "http://localhost/" + image
    }else{
      return null
    }
  },

  deleteUserImage: function(image){
    var p = path.join(__dirname, '../public/images/users/' + image)
    return fs.unlink(p)
  },

  deleteSettlementImage: function(image){
    var p = path.join(__dirname, '../public/images/settlements/' + image)
    return fs.unlink(p)
  },

  deletPromotionImage: function(image){
    var p = path.join(__dirname, '../public/images/promotions/' + image)
    return fs.unlink(p)
  },

  deleteGalleryImage: function(image){
    var p = path.join(__dirname, '../public/images/gallery/' + image)
    return fs.unlink(p)
  }
}
