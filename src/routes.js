import VueRouter from 'vue-router'

let routes = [
  {
    path: '/users',
    component: require('./components/UsersTable.vue').default
  },
  {
    path: '/settlements',
<<<<<<< HEAD
    component: require('./components/Settlements.vue').default,
    children: [
      {
        path: 'profile',
        component: require('./components/SettlementProfile.vue').default
      }

    ]
=======
    component: require('./components/SettlementsTable.vue').default
  },
  {
    name: 'home',
    path: '/home/:token',
    component: require('./components/shared/ToolbarWithDrawer.vue').default
  },
  {
    path: '/',
    component: require('./components/Login.vue').default
>>>>>>> 734e23c85764f347d21f08f366f858b72f75b044
  }
]

export default new VueRouter({
  routes
})
