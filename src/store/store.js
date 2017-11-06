import * as types from './mutation-types'
import Vue from 'vue'
import Vuex from 'vuex'
import userLogin  from '../api/Login'

// Haz Vue consciente de Vuex
Vue.use(Vuex)

// Crea un objeto conteniendo el estado inicial
// para cuando la app es iniciada
const state = {
  loginStatus:{
  	status:false,
  	message:''
  }
}

// Crea un objeto almacenando varias mutaciones. Escribe la mutación
const mutations = {
	LOGIN_STATUS(store,object){
		store.loginStatus.status = object.status
		store.loginStatus.message = object.message
	}
}

const actions = {
	loginAttempt (context ,params) {

			return new Promise((resolve,reject) => {
				userLogin.userLogin(params)
			  		.then(data => {
			  		let userToken = data.data.payload.token;
			  		if( userToken.length > 0 ){
			  			//TODO: Change the verification of token length>0 to authenticity of the token
			  			let response = {
			  				status : false,
			  				message : 'ok'
			  			}
			  			context.commit(types.LOGIN_STATUS,status)
			  			resolve(response)

			  		}
			  		})
			  		.catch(data => {
	  					let response = {
			  				status : true,
			  				message : 'Usuario o contraseña incorrectos'
			  			}
			  			context.commit(types.LOGIN_STATUS,status)
			  			reject(response)
			  	})
			})

	  	}

}

const getters = {
	getErrorMessage({ message }){
		return message
	}
}

// Combina el estado inicial y las mutaciones para crear un almacén Vuex
// Este almacén puede puede vincularse a nuestra app
export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})