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
        // UserProfile will be rendered inside User's <router-view>
        // when /user/:id/profile is matched
        path: 'profile',
        component: require('./components/SettlementProfile.vue').default
      }

    ]
  }
]

export default new VueRouter({
  routes
})
