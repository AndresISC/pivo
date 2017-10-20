import VueRouter from 'vue-router'

let routes = [
  {
    path: '/users',
    component: require('./components/UsersTable.vue').default
  },
  {
    path: '/settlements',
    component: require('./components/Settlements/Settlements.vue').default
  },
  {
    name: 'categories',
    path: '/categories',
    component: require('./components/Settlements/Categories/Categories.vue').default
  },
  {
    name: 'home',
    path: '/home/:token',
    component: require('./components/UsersTable.vue').default
  },
  {
    name: 'login',
    path: '/',
    component: require('./components/Login.vue').default
  }
]

export default new VueRouter({
  routes
})
