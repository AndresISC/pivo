import createPersistedState from 'vuex-persistedstate'

export const plugins =[createPersistedState({
		key: 'login',
		paths: ['login']
	})]