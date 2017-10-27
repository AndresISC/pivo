var codeMapper = require('./ErrorCodesMapper')

module.exports = {
  parseValidationError: function(err){
    var errors = err.errors.map( e => {
      return {
        code: codeMapper.mapSequelizeError(e.type),
        detail: e.message,
        source: e.path,
        value: e.value
      }
    })

    var response = {
      message: "Validation Error",
      errors: errors
    }

    return response
  }
}
