<template lang="html">
  <div>
    <input ref="imageInput" type="file" hidden @change="onPhotoUploaded">
    <div   class="text-xs-center">
      <img class="image-picker-preview" :src="getImage"  @click.stop="click">
    </div>
  </div>
</template>

<script>
import imageUtils from '../../utils/ImageUtils'
export default {
  props:{
    value:{
      type: File
    },
    default:{
      type: String,
      default: "http://ferreteriaelpuente.com.ar/wp-content/uploads/2015/08/sin-imagen.png"
    }
  },
  data(){
    return {
      image: null
    }
  },
  computed:{
    getImage(){
      return this.image || this.default
    }
  },
  methods:{
    click(){
      this.$refs.imageInput.click()
    },
    onPhotoUploaded(e){
      if(e.target.files.length > 0){
        this.$emit('input', this.$refs.imageInput.files[0])
      }else{
        this.$emit('input', null)
      }

      imageUtils.getImageFromTarget(this.$refs.imageInput, image => {
        this.image = image
      })
    }
  }
}
</script>

<style lang="css">
  .image-picker-preview {
    border-radius: 10px;
    max-width:200px;
    max-height:200px;
    width: auto;
    height: auto;
}
</style>
