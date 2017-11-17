import * as types from './mutation-types'
import Vue from 'vue'

export const SET_ERRORS = (state, {errors}) => {
  state.errors = errors
}

export const CLEAR_ERROR = (state, {key}) => {
  state.errors.clear(key)

}

export const SET_STATUS = (state, {status}) => {
  if (status){
    state.status = status
  }else{
    state.status = null
  }
}