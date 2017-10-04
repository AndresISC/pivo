<template>
<v-app>
    <router-view>
    </router-view>
</v-app>
</template>

<script>
import loginComponent from './components/Login.vue'

export default {
  name: 'app',
  data () {
    return {

    }
  }
}
</script>

<style>
  @import '../node_modules/vuetify/dist/vuetify.min.css';
</style>
