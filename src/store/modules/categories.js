import * as types from '../mutation-types'
import api from '../../api/Settlement'
import errorParser from '../../utils/ErrorParser'
import Error from '../../utils/Error'
import * as globalMutations from '../mutations'
import * as globalGetters from '../getters'

const state = {
  categories: [],
  errors: new Error(),
  status: null
}

const getters = {
  ...globalGetters
}

const mutations ={
  [types.SET_CATEGORIES](state, payload){
    state.categories = payload.categories
  },
  [types.ADD_CATEGORY] (state, payload) {
    state.categories.push(payload.category)
  },
  [types.REMOVE_CATEGORY](state, payload){
    state.categories.splice(payload.index, 1)
  },
  ...globalMutations
}

const actions = {
  getCategories({commit}){
    api.getCategories()
    .then(res => {
      commit(types.SET_CATEGORIES, { categories: res.data.payload.categories })
    })
    .catch(err => {
      console.log(err);
    })
  },
  postCategory({commit}, payload){
    api.postCategory(payload.category)
    .then(res => {
      commit(types.ADD_CATEGORY,{ category: res.data.payload })
      commit(types.SET_STATUS, { status: {type: 'success', message: 'Creacion exitosa'} })
    })
    .catch(err => {
      commit(types.SET_ERRORS, { errors: errorParser.parse(err.response.data.errors) })
      commit(types.SET_STATUS, { status: {type: 'failure', message: 'Ha ocurrido un error'} })
    })
  },
  deleteCategory({commit}, payload){
    api.deleteCategory(payload.categoryId)
    .then(res => {
      commit(types.REMOVE_CATEGORY,{ index: payload.index })
      commit(types.SET_STATUS, { status: {type: 'success', message: 'Borrado exitoso'} })
    })
    .catch(err => {
      commit(types.SET_ERRORS, { errors: err })
      commit(types.SET_STATUS, { status: {type: 'failure', message: 'Ha ocurrido un error'} })
    })
  }
}

export default{
  state,
  getters,
  actions,
  mutations
}
