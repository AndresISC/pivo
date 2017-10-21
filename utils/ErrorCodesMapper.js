module.exports = {
  mapSequelizeError: function(error){

    switch(error){
      case 'notNull Violation': return 101
      default: return 100
    }
  }
}
