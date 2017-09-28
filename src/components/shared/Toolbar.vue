<template >
  <v-toolbar fixed dark class="pink lighten-1 elevation-0">
    <v-toolbar-side-icon @click.stop="onSideIconClicked"></v-toolbar-side-icon>
    <v-toolbar-title class="white--text">{{ title }}</v-toolbar-title>
  </v-toolbar>
</template>

<script>

export default {
  name:'AppToolbar',
  data(){
    return {
      title: 'Pivo App'
    }
  },

  methods:{
    onSideIconClicked(){
      this.$emit('onSideIconClicked')
    }
  }
}
</script>

<style lang="css">
</style>
