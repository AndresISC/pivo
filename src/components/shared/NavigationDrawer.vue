<template lang="">
  <v-navigation-drawer absolute persistent light v-model="drawer" overflow>
    <v-toolbar flat class="transparent">
      <v-list class="pa-0">
        <v-list-tile avatar>
          <v-list-tile-avatar>
            <img src="https://randomuser.me/api/portraits/men/85.jpg" />
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>Arturo Gasca</v-list-tile-title>
            <v-list-tile-title>agasca1994@pivo.com</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-toolbar>
    <v-list class="pt-0" dense>
      <v-divider></v-divider>
      <router-link v-for="item in items" :to="item.link" :key="item.title" exact>
        <v-list-tile @click="">
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
</template>

<script>
export default {
  name: 'navigationDrawer',
  props: ['drawer'],
  data(){
    return {
      items: [
          { title: 'Inicio', icon: 'home', link:"/" },
          { title: 'Usuarios', icon: 'account_box', link:"/users" },
          { title: 'Negocios', icon: 'account_box', link:"/settlements" }
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
