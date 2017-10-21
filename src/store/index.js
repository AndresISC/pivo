import Vue from 'vue'
import Vuex from 'vuex'
import api from '../api/Settlement'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    categories: [],
    error: null,
    status: null
  },
  getters:{
    hasStatus: state =>{
      return state.status
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
    setError(state, payload){
      state.error = payload.error
    },
    setStatus(state, payload){
      var status = payload.status
      if (status){
        state.status = status
      }else{
        state.status = null
      }
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
        commit('setError', { error: err })
        commit('setStatus', { status: {type: 'failure', message: 'Ha ocurrido un error'} })
      })
    }
  }
})
