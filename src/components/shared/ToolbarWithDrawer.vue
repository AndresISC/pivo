<template>
   <v-app id="example-2" toolbar>
     <app-navigation-drawer :drawer="drawer"></app-navigation-drawer>
     <app-toolbar @onSideIconClicked="toggleDrawer"></app-toolbar>
     <slot></slot>
  </v-app>
</template>

<script>
import navbar from './NavigationDrawer.vue'
import toolbar from './Toolbar.vue'

export default {
  data(){
    return {
      drawer: false
    }
  },
  components: {
    'app-toolbar': toolbar,
    'app-navigation-drawer': navbar
  },
  methods: {
    toggleDrawer(){
      this.drawer = !this.drawer
    }
  }
}
</script>

<style lang="css">
</style>
