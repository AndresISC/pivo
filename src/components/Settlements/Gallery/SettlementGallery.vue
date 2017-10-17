<template lang="html">

  <v-container fluid grid-list-sm>
    <p> {{ settlementId }} </p>
    <v-layout row wrap>
      <v-flex xs6 v-for="photo in gallery" :key="photo.id">
        <app-photo :photo="photo"></app-photo>
      </v-flex>
    </v-layout>
  </v-container>

</template>

<script>
import api from '../../../api/Settlement'
import photo from './Photo.vue'
export default {
  props:['settlementId'],
  data(){
    return {
      gallery: []
    }
  },
  components:{
    'app-photo': photo
  },
  watch:{
    settlementId(){
      if(this.settlementId){
        api.getGallery(this.settlementId)
        .then(result => {
          this.gallery = result.data.payload
        })
      }else{
        this.gallery = []
      }
    }
  }
}
</script>
