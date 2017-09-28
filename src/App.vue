<template>
<v-app>
    <app-toolbar-with-drawer>
      <main>
        <v-container fluid>
          <router-view></router-view>
        </v-container>
      </main>
    </app-toolbar-with-drawer>
</v-app>
</template>

<script>
import toolbar from './components/shared/ToolbarWithDrawer.vue'

export default {
  name: 'app',
  components:{
    'app-toolbar-with-drawer': toolbar
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
