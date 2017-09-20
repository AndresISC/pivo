class ApiError{
  static createServerError(){
    return new ApiError("Server Error. Try again later.", "serverError")
  }
  constructor(message, type, path, value){
    this.message = message
    this.type = type
    this.path = path
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
