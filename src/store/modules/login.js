import userLogin  from '../../api/Login'
import * as types from '../mutation-types'
import createPersistedState from 'vuex-persistedstate'

const namespaced = true

const state = {
	form:{
		username: '',
		password: ''
	},
	status:{
		status: null,
		message: null
	},
	token: null
}

const mutations = {
	LOGIN_STATUS : function (store,object) {
		store.status.status = object.status
		store.status.message = object.message
	},

	USERNAME : function (store,object) {
		store.form.username = object.username
	},

	PASSWORD : function (store,object) {
		store.form.password = object.password
	},

	USER_TOKEN : function (store,token) {
		store.token = token
	},
}

const actions = {
	login: function(context) {

		let params = {
					email: context.state.form.username,
					password: context.state.form.password
				}
		console.log(params)
		return new Promise((resolve,reject) => {
			userLogin.userLogin(params)
		  		.then( (data) => {
		  		let user_token = data.data.payload.token
			  		if( user_token.length > 0 ){
			  			let response = {
			  				status: true,
			  				message: null
			  			}
			  			context.commit(types.LOGIN_STATUS,response)
			  			context.commit(types.USER_TOKEN,user_token)
			  			resolve(response)
			  		}
		  		})
		  		.catch( (data) => {
		  			let response = {
		  				status : false,
		  				message : 'Usuario o contraseña inválidos'
		  			}
		  			context.commit(types.LOGIN_STATUS,response)
		  			reject(response)
		  	})
		})

	}
}

export default {
	namespaced:true,
	state: state,
	mutations: mutations,
	actions: actions,
	plugins: [createPersistedState()]
}