import VueRouter from 'vue-router'

let routes = [
  {
    path: '/users',
    component: require('./components/Datatable.vue').default
  }
]

export default new VueRouter({
  routes
})
