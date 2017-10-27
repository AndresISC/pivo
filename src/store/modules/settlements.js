import * as types from '../mutation-types'
import api from '../../api/Settlement'
import errorParser from '../../utils/ErrorParser'
import Error from '../../utils/Error'
import * as globalMutations from '../mutations'
import * as globalGetters from '../getters'

const namespaced = true

const state = {
  settlements: [],
  errors: new Error(),
  status: null
}

const getters = {
  ...globalGetters
}

const mutations ={
  [types.SET_SETTLEMENTS](state, payload){
    state.settlements = payload.settlements
  },
  [types.ADD_SETTLEMENT] (state, payload) {
    state.settlements.push(payload.settlement)
  },
  [types.REMOVE_SETTLEMENT](state, payload){
    state.settlements.splice(payload.index, 1)
  },
  ...globalMutations
}

const actions = {
  getSettlements({commit}){
    api.getSettlements()
    .then(res => {
      commit(types.SET_SETTLEMENTS, { settlements: res.data.payload.settlements })
    })
    .catch(err => {
      console.log(err);
    })
  },
  postSettlement({commit}, payload){
    api.postSettlement(payload.settlement)
    .then(res => {
      commit(types.ADD_SETTLEMENT,{ settlement: res.data.payload })
      commit(types.SET_STATUS, { status: {type: 'success', message: 'Creacion exitosa'} })
    })
    .catch(err => {
      commit(types.SET_ERRORS, { errors: errorParser.parse(err.response.data.errors) })
      commit(types.SET_STATUS, { status: {type: 'failure', message: 'Ha ocurrido un error'} })
    })
  },
  deleteSettlement({commit}, payload){
    api.deleteSettlement(payload.settlementId)
    .then(res => {
      commit(types.REMOVE_SETTLEMENT,{ index: payload.index })
      commit(types.SET_STATUS, { status: {type: 'success', message: 'Borrado exitoso'} })
    })
    .catch(err => {
      commit(types.SET_ERRORS, { errors: err })
      commit(types.SET_STATUS, { status: {type: 'failure', message: 'Ha ocurrido un error'} })
    })
  }
}

export default{
  namespaced,
  state,
  getters,
  actions,
  mutations
}
