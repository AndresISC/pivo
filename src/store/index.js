import Vue from 'vue'
import Vuex from 'vuex'

import categories from './modules/categories'
import settlements from './modules/settlements'
import login from './modules/login'
import { plugins } from './modules/persisted'

Vue.use(Vuex)

export default new Vuex.Store({
	modules:{
	  categories,
	  settlements,
	  login
	},
	plugins
})