export const getStatus = state => {
  return state.status
}

export const isFailed = state => {
  if (state.status){
    return state.status.type === 'failure'
  }else{
    return false
  }
}

export const isSuccess = state => {
  if (state.status){
    return state.status.type === 'success'
  }else{
    return false
  }
}

export const getError = state => key => {
  return state.errors.get(key)
}
