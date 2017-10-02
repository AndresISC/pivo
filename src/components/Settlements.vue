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
        right: null
      }
    },
    components: {
      'app-settlements-table': settlementsTable,
      'app-settlement-profile': settlementProfile
    },
    watch:{
      right: function(v){
        console.log(v);
      }
    },
    mounted(){
      bus.listen('onSettlementSelected', settlement => {
        this.right = true
        router.push('/settlements/profile')
      })
    }
  }
</script>
