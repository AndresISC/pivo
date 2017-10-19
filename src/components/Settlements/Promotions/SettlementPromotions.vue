<template lang="html">
  <v-container fluid grid-list-sm>
    <v-layout row wrap>
      <v-flex xs6 v-for="(promotion, index) in promotions" :key="promotion.id">
        <app-promotion
          @onPromotionDeleted="deletePromotion"
          :promotion="promotion" :i="index"/>
      </v-flex>
    </v-layout>
  </v-container>

  <!--<app-promotion-form :promotion="{startDate: null, endDate: null, image: null, description: null}" :sid="settlementId" ></app-promotion-form>-->
</template>

<script>
import api from '../../../api/Settlement'
import promotion from './Promotion.vue'
import promotionForm from './PromotionForm.vue'

export default {
  props:['settlementId'],
  data(){
    return{
      promotions: []
    }
  },
  components:{
    'app-promotion': promotion,
    'app-promotion-form': promotionForm
  },
  methods:{
    deletePromotion(data){
      this.promotions.splice(data.index, 1)
    }
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
