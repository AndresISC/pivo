<template>
<v-app>
    <app-toolbar >
      <main>
        <router-view>
        </router-view>
      </main>

    </app-toolbar>

    <app-footer>
    </app-footer>
</v-app>
</template>

<script>
import loginComponent from './components/Login.vue'
import toolbar from './components/shared/ToolbarWithDrawer.vue'
import footer from './components/shared/Footer.vue'

export default {
  name: 'app',
  components:{
    'app-toolbar': toolbar,
    'app-footer': footer
  },

  data () {
    return {
      
    }
  }

}
</script>

<style>
  @import '../node_modules/vuetify/dist/vuetify.min.css';
</style>
