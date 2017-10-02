



<template>
  <div id="example-2" toolbar>
    <v-navigation-drawer absolute persistent light v-model="drawer" overflow :disable-route-watcher="true">
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
    <v-toolbar extended fixed class="indigo darken-4" dark>
      <v-toolbar-side-icon @click.stop="toggleDrawer"></v-toolbar-side-icon>
      <v-toolbar-title>Toolbar</v-toolbar-title>
    </v-toolbar>
    <slot></slot>
  </div>
</template>



<script>


export default {
  data(){
    return {
      drawer: false,
      items: [
          { title: 'Inicio', icon: 'home', link:"/" },
          { title: 'Usuarios', icon: 'account_box', link:"/users" },
          { title: 'Negocios', icon: 'account_box', link:"/settlements" }
        ]
    }
  },
  methods: {
    toggleDrawer(){
      this.drawer = !this.drawer
    }
  }
}
</script>

<style media="screen">
  a{
    text-decoration: none;
  }
</style>
