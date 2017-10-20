<template>
  <div toolbar>
    <v-navigation-drawer absolute persistent light v-model="drawer" overflow :disable-route-watcher="true" v-if="show">
      <v-toolbar flat class="transparent">
        <v-list class="pa-0">
          <v-list-tile avatar>
            <v-list-tile-avatar>
              <img src="https://randomuser.me/api/portraits/men/85.jpg" />
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>John Leider</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-toolbar>
      <v-list class="pt-0" dense>
        <v-divider></v-divider>
        <router-link v-for="item in items" :to="item.link" :key="item.title" exact>
          <v-list-tile>
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </router-link>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar fixed dark class="pink lighten-1 white--text">
      <v-toolbar-side-icon v-if="show" @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title> {{ title }} </v-toolbar-title>
    </v-toolbar>
    <slot></slot>
  </div>
</template>

<script>
export default {
  mounted(){
    this.updateShow()
  },
  watch:{
    $route(){
      this.updateShow()
    }
  },
  methods:{
    updateShow(){
      if (this.$route.name === "login"){
        this.show = false
      }else{
        this.show = true
      }
    }
  },
  data(){
    return {
      title: 'Pivo',
      show: true,
      drawer: false,
      items: [
          { title: 'Inicio', icon: 'home', link:"/home" },
          { title: 'Usuarios', icon: 'account_box', link:"/users" },
          { title: 'Negocios', icon: 'business', link:"/settlements" },
          { title: 'Categorías', icon: 'account_box', link:"/categories" }
        ]
    }
  }
}
</script>

<style media="screen">
  a{
    text-decoration: none;
  }
</style>
