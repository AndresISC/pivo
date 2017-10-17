<template>
  <div >
    <app-table ></app-table>

    <v-navigation-drawer
      right
      temporary
      v-model="right"
      absolute
      v-bind:class="{ open: right }"
    >
    <app-gallery :settlementId="settlementId()"></app-gallery>
    <!--<app-promotions :settlementId="settlementId()"></app-promotions>-->

    </v-navigation-drawer>
  </div>
</template>

<script>
import table from './SettlementsTable.vue'
import profile from './SettlementProfile.vue'
import gallery from './Gallery/SettlementGallery.vue'
import promotions from './Promotions/SettlementPromotions.vue'

  export default {
    data () {
      return {
        right: null,
        selectedSettlement: null
      }
    },
    components: {
      'app-table': table,
      'app-profile': profile,
      'app-gallery': gallery,
      'app-promotions': promotions
    },
    methods:{
      settlementId(){
        if(this.selectedSettlement){
          return this.selectedSettlement.id
        }else{
          return null
        }
      }
    },
    mounted(){
      bus.listen('onSettlementSelected', settlement => {
        this.right = true
        this.selectedSettlement = settlement
      })
    }
  }
</script>
<style media="screen">
  .open{
    width: 500px;
  }

</style>
