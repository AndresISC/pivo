<template lang="html">
  <v-card>
    <v-card-media
      class="white--text"
      height="200px"
      :src="promotion.imagePath"
    >
      <v-container fill-height fluid>
        <v-layout fill-height>
          <v-flex xs12 align-end flexbox>
            <span class="headline"></span>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card-media>
    <v-card-text class="pt-2 pb-1">
      <span>Del <b>{{ promotion.startDate | formatDate }}</b> al <b>{{ promotion.endDate | formatDate }}</b></span>
    </v-card-text>
    <v-card-actions class="white">
      <v-spacer></v-spacer>
      <v-btn icon @click.stop="deletePromotion">
        <v-icon>delete</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>edit</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import moment from 'moment'
import api from '../../../api/Settlement'
export default {
  props: ['promotion','i'],
  filters:{
    formatDate(date){
      var currentDate = moment(date).format('DD/MM/YYYY')
      return currentDate
    }
  },

  methods:{
    deletePromotion(){
      api.deletePromotion(this.promotion.id)
      .then(response => {
        var payload = {
          promotion: this.promotion,
          index: this.i
        }
        this.$emit('onPromotionDeleted', payload)
      })
      .catch(err => {
        console.log(err);
      })
    }
  }
}
</script>
