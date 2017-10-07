var path = require('path')
var fs = require('fs')
var fileUpload = require('express-fileupload')
var shortid = require('shortid');

var imagesDirectory = "public/images/"

module.exports = {
  generateURL: function(image){
    if(image !== null){
      return "http://localhost/" + image
    }else{
      return null
    }
  },

  generateImageName: function(prefix){
    return prefix + '-' + shortid.generate() + '.jpg'
  },

  saveImage: function(req, directory, field = 'image'){
    var image = req.files.image,
        imageName = req.body[field],
        imagePath = path.join(__dirname, "../" + imagesDirectory + directory),
        fullPath = path.join(imagePath, imageName)

        return image.mv(fullPath)
  },

  deleteImage: function(imagePath){
    var p = path.join(__dirname, '../' + imagesDirectory + imagePath)
    return fs.unlink(p)
  }
}
