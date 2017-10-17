<template lang="html">
  <div class="photo-container grey darken-4">
    <img class="image" :src="photo.imagePath"  >
    <div class="middle">
      <v-btn class="white" @click.stop="deletePhoto" icon>
        <v-icon>delete</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script>
import api from '../../../api/Settlement'
export default {
  props:['photo','i'],
  methods:{
    deletePhoto(){
      api.deletePhoto(this.photo.id)
      .then(result => {
        var payload = {
          photo: this.photo,
          index: this.i
        }
        this.$emit('onPhotoDeleted', payload)
      })
      .catch(err => {
        console.log(err);
      })
    }
  }
}
</script>

<style lang="css">
.photo-container {
    position: relative;
    width: 100%;
    height: 100%;
}

.image {
  opacity: 1;
  display: block;
  transition: .5s ease;
  backface-visibility: hidden;
  width: 100%;
  height: 170px;
}

.middle {
  transition: .5s ease;
  opacity: 0;
  position: absolute;
  top: 50%;

  left: 50%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%)
}

.photo-container:hover .image {
  opacity: 0.3;
}

.photo-container:hover .middle {
  opacity: 1;
}
</style>
