var fileUpload = require('express-fileupload');
var path = require('path');

//Save a motherfucking file
function save(file, filename, filePath){
  var imagePath = path.join(filePath, filename)
  return file.mv(imagePath)
}

module.exports = {
  save
}
