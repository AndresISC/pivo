<template lang="html">
  <div class="new-photo-container ">

    <input ref="photoUpload" type="file" class="hide" @change="onPhotoUploaded">

    <div v-if="loading">
      <v-progress-circular class="loader" indeterminate v-bind:value="100" color="blue-grey"></v-progress-circular>
      <div class="loading-image-container">
        <img v-if="uploadingImage !== null" class="image" :src="uploadingImage">
      </div>
    </div>

    <v-btn v-if="!loading" flat class="new-btn" @click.stop="uploadPhoto">
      <div class="new-middle">
        <v-icon >image</v-icon>
        <p class="mt-2">Nueva</p>
      </div>
    </v-btn>

  </div>
</template>

<script>
import api from '../../api/Settlement'
import utils from '../../utils/ImageUtils'
export default {
  props: ['settlementId'],
  data(){
    return {
      uploadingImage: null,
      loading: false
    }
  },
  methods:{
    onPhotoUploaded(e){
      this.loading = true
      utils.getImageFromTarget(e.target, image => {
        this.uploadingImage = image
      })
      var photo = this.$refs.photoUpload.files[0]
      api.postPhoto(this.settlementId, photo)
      .then(response => {
        this.loading = false
        this.$emit('onPhotoUploaded', response.data.payload.gallery)
      })
      .catch(err => {
        console.log(err);
      })
    },

    uploadPhoto(){
      this.$refs.photoUpload.click()
    },


  }
}
</script>

<style lang="css">
.loading-image-container{
  opacity: 0.2;
}
.new-btn{
  width: 100%;
  height: 100%;
  margin: 0px;
}
.new-photo-container {
    position: relative;
    width: 100%;
    height: 170px;
    border: 3px dashed black;
}

.new-middle, .loader {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
}

.hide{
  display: none;
}
</style>
