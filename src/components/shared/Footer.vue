<template lang="html">
  <v-footer class="pa-3 pink lighten-1 white--text" :fixed="true">
      <v-spacer>{{ footer_content }} {{  new Date().getFullYear() }}</v-spacer>
      <div>{{ all_rights }}</div>
  </v-footer>
</template>

<script>
export default {
  data(){
    return {
      footer_content: '© Pivo - Trademark',
      all_rights: 'Todos los derechos reservados',
    }
  }
}
</script>

<style lang="css">
</style>
