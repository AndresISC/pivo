<template lang="html">
  <div class="photo-container grey darken-4">
    <img class="image" :src="photo.imagePath" width="100%" height="100%">
    <div class="middle">
      <v-btn class="white" icon>
        <v-icon>delete</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  props:['photo']
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
