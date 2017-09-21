var fileUpload = require('express-fileupload');
var path = require('path');

function save(file, filename, filePath, next){
  var imagePath = path.join(filePath, filename)
  return file.mv(imagePath)
}

module.exports = {
  save
}
