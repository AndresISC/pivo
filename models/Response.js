class ApiError{
  static createServerError(){
    return new ApiError("serverError","Server Error. Try again later." )
  }
  constructor(code, detail, source, value){
    this.code = code
    this.detail = detail
    this.source = source
    this.value = value
  }
}

class Response{

  constructor(status, message, payload){
    this.message = message
    if (status === "OK"){
      this.payload = payload
    }else{
      this.errors = payload
    }
  }

  static createOkResponse(message, payload){
    return new Response("OK", message, payload)
  }

  static createErrorResponse(message, payload){
    return new Response("ERROR", message, payload)
  }

  static createServerErrorResponse(){
    return Response.createErrorResponse("Server Error", [ApiError.createServerError()])
  }
}


module.exports.Response = Response
module.exports.ApiError = ApiError
