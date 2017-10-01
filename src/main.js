import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './login.vue'//'./App.vue'
import Event from './utils/EventDispatcher.js'
import router from './routes'
import VueRouter from 'vue-router'

window.bus = Event.bus

Vue.use(Vuetify)
Vue.use(VueRouter)

new Vue({
  el: '#app',
  render: h => h(App),
  router
})
