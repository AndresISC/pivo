module.exports = {
  mapSequelizeError: function(error){

    switch(error){
      case 'Validation error': return 101
      case 'notNull Violation': return 102
      case 'unique violation': return 103

      default: return 100
    }
  }
}
