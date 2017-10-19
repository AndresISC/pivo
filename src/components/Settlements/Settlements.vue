<template>
  <div >
    <app-table ></app-table>

    <v-navigation-drawer
      v-if="selectedSettlement"
      right
      temporary
      v-model="right"
      absolute
      v-bind:class="{ open: right }"
    >
    <!--<app-gallery :settlementId="settlementId()"></app-gallery>-->
    <!--<app-promotions :settlementId="selectedSettlement.id"></app-promotions>-->
    <app-settlement :settlement="{name: null, description: null, image: null, email: null, phone: null, facebookUrl: null, url: null, latitude: null, longitude: null}"></app-settlement>

    </v-navigation-drawer>
  </div>
</template>

<script>
import table from './SettlementsTable.vue'
import profile from './SettlementProfile.vue'
import gallery from './Gallery/SettlementGallery.vue'
import promotions from './Promotions/SettlementPromotions.vue'
import settlement from './SettlementProfile.vue'
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
      'app-promotions': promotions,
      'app-settlement': settlement
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
