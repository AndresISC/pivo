module.exports = {
  getImageFromTarget: function(target, next){
    var reader = new FileReader();
    reader.onload = function(e){
      next(e.target.result)
    }
    reader.readAsDataURL(target.files[0]);
  }
}
