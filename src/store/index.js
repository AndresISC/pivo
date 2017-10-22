import Vue from 'vue'
import Vuex from 'vuex'
import api from '../api/Settlement'
import errorParser from '../utils/ErrorParser'
import Error from '../utils/Error'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    categories: [],
    errors: new Error(),
    status: null
  },
  getters:{
    getStatus: state =>{
      return state.status
    },
    isFailed: state => {
      if (state.status){
        return state.status.type === 'failure'
      }else{
        return false
      }
    },
    isSuccess: state => {
      if (state.status){
        return state.status.type === 'success'
      }else{
        return false
      }
    }
  },
  mutations: {
    addCategory (state, payload) {
      state.categories.push(payload.category)
    },
    removeCategory(state, payload){
      state.categories.splice(payload.index, 1)
    },
    setCategories(state, payload){
      state.categories = payload.categories
    },
    setErrors(state, payload){
      state.errors = payload.errors
    },
    setStatus(state, payload){
      var status = payload.status
      if (status){
        state.status = status
      }else{
        state.status = null
      }
    },
    clearError(state, payload){
      state.errors.clear(payload.key)
    }
  },
  actions:{
    getCategories({commit}){
      api.getCategories()
      .then(res => {
        commit('setCategories', { categories: res.data.payload.categories })
      })
      .catch(err => {
        console.log(err);
      })
    },
    postCategory({commit}, payload){
      api.postCategory(payload.category)
      .then(res => {
        commit('addCategory',{ category: res.data.payload })
        commit('setStatus', { status: {type: 'success', message: 'Creacion exitosa'} })
      })
      .catch(err => {
        console.log(err);
        commit('setErrors', { errors: errorParser.parse(err.response.data.errors) })
        commit('setStatus', { status: {type: 'failure', message: 'Ha ocurrido un error'} })
      })
    },
    deleteCategory({commit}, payload){
      api.deleteCategory(payload.categoryId)
      .then(res => {
        commit('removeCategory',{ index: payload.index })
        commit('setStatus', { status: {type: 'success', message: 'Borrado exitoso'} })
      })
      .catch(err => {

        commit('setErrors', { errors: err })
        commit('setStatus', { status: {type: 'failure', message: 'Ha ocurrido un error'} })
      })
    }
  }
})
