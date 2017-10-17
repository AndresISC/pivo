<template lang="html">

  <v-container fluid grid-list-sm>
    <v-layout row wrap>
      <v-flex xs6 v-for="(photo, index) in gallery.concat([{id:-1}])" :key="photo.id">
        <app-photo
          v-if="photo.id !== -1"
          :photo="photo" :i="index"
          @onPhotoDeleted="deletePhoto"/>

        <app-new-photo
          v-if="photo.id === -1"
          :settlementId="settlementId"
          @onPhotoUploaded="uploadPhoto"/>
      </v-flex>

    </v-layout>
  </v-container>

</template>

<script>
import api from '../../../api/Settlement'
import photo from './Photo.vue'
import newPhoto from '../../shared/NewPhoto.vue'

export default {
  props:['settlementId'],
  data(){
    return {
      gallery: []
    }
  },
  components:{
    'app-photo': photo,
    'app-new-photo': newPhoto
  },
  methods:{
    deletePhoto(data){
      this.gallery.splice(data.index, 1)
    },

    uploadPhoto(photo){
      this.gallery.push(photo)
    }
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
