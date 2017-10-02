import VueRouter from 'vue-router'

let routes = [
  {
    path: '/users',
    component: require('./components/UsersTable.vue').default
  },
  {
    path: '/settlements',
    component: require('./components/Settlements.vue').default,
    children: [
      {
        path: 'profile',
        component: require('./components/SettlementProfile.vue').default
      }

    ]
  }
]

export default new VueRouter({
  routes
})
