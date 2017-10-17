<template lang="html">
  <v-container fluid grid-list-sm>
    <p> {{ settlementId }} </p>
    <v-layout row wrap>
      <v-flex xs6 v-for="promotion in promotions" :key="promotion.id">
        <app-promotion :promotion="promotion"></app-promotion>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import api from '../../../api/Settlement'
import promotion from './Promotion.vue'


export default {
  props:['settlementId'],
  data(){
    return{
      promotions: []
    }
  },
  components:{
    'app-promotion': promotion
  },
  watch:{
    settlementId(){
      if(this.settlementId){
        api.getPromotions(this.settlementId)
        .then(response => {
            this.promotions = response.data.payload
        })
      }
    }
  }
}

</script>

<style lang="css">
</style>
