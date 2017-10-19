module.exports = {
  getImageFromTarget: function(target, next){
    var reader = new FileReader();
    reader.onload = function(e){
      next(e.target.result)
    }
    if(target.files.length > 0){
      reader.readAsDataURL(target.files[0]);
    }else{
      next(null)
    }

  }
}
