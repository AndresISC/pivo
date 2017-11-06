import Vue from 'vue'
import Vuex from 'vuex'

import categories from './modules/categories'
import settlements from './modules/settlements'
import { actions } from './actions'

Vue.use(Vuex)

export default new Vuex.Store({
	modules:{
	  categories,
	  settlements
	}
})
