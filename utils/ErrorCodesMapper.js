module.exports = {
  mapSequelizeError: function(error){

    switch(error){
      case 'notNull Violation': return 101
      case 'unique violation': return 102
      default: return 100
    }
  }
}
