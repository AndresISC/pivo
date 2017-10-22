import Errors from './Error'

export default{
  parse(errors){
    var error = new Errors()
    var parsedErrors2 =
      errors.reduce((parsedErrors, e) => {
        parsedErrors[e.source] = {
          code: e.code,
          detail: e.detail,
          value: e.value
        }

        return parsedErrors
      }, {})

    error.record(parsedErrors2)
    return error
  }
}
