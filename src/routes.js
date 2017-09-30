import VueRouter from 'vue-router'

let routes = [
  {
    path: '/users',
    component: require('./components/UsersTable.vue').default
  },
  {
    path: '/settlements',
    component: require('./components/SettlementsTable.vue').default
  }
]

export default new VueRouter({
  routes
})
