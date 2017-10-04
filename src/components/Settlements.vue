<template>
  <div >
    <app-settlements-table>
    </app-settlements-table>

    <v-navigation-drawer
      right
      temporary
      v-model="right"
      absolute
    >
      <router-view></router-view>
    </v-navigation-drawer>
  </div>
</template>

<script>
import settlementsTable from './SettlementsTable.vue'
import settlementProfile from './SettlementProfile.vue'
import router from '../routes'

  export default {
    data () {
      return {
        right: null,
        selectedSettlement: null
      }
    },
    watch:{
      right(){
        if (!this.right){
          router.replace('/settlements')
        }
      }
    },
    beforeRouteEnter: (to, from, next) => {
        next( vm => {
          if (to.path === "/settlements/profile"){
            vm.right = true
          }
        })
    },
    components: {
      'app-settlements-table': settlementsTable,
      'app-settlement-profile': settlementProfile
    },
    mounted(){
      bus.listen('onSettlementSelected', settlement => {
        this.right = true
        this.selectedSettlement = settlement
        router.replace('/settlements/profile')
      })
    }
  }
</script>
