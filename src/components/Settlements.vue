<template lang="html">
  <v-app>
    <app-settlements-table>
    </app-settlements-table>

    <v-navigation-drawer absolute persistent light v-model="d" overflow style="width: 300px" :right="true">
      <router-view></router-view>
    </v-navigation-drawer>
  </v-app>

</template>

<script>
import settlementsTable from './SettlementsTable.vue'
import settlementProfile from './SettlementProfile.vue'
import router from '../routes'

export default {
  data(){
    return {
      d: false
    }
  },
  components: {
    'app-settlements-table': settlementsTable,
    'app-settlement-profile': settlementProfile
  },
  mounted(){
    bus.listen('onSettlementSelected', settlement => {
      this.d = true

      //router.replace('/settlements/profile')
    })
  }
}
</script>

<style lang="css">
</style>
