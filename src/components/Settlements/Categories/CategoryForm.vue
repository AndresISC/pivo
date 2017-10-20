<template lang="html">
  <div class="pa-4">

    <v-form v-model="valid" ref="form" width="100%">
      <input ref="imageInput" type="file" hidden @change="onPhotoUploaded">

      <v-flex xs6 offset-xs3  class="text-xs-center">
        <img :src="getImage" width="100%" height="240px" @click.stop="click">
      </v-flex>

      <v-text-field
        name="name"
        v-model="mutableCategory.name"
        label="Nombre"
        single-line
        prepend-icon="email"
      ></v-text-field>

      <v-btn @click.stop="saveCategory">
        click
      </v-btn>
    </v-form>


  </div>

</template>

<script>
import api from '../../../api/Settlement'
import imageUtils from '../../../utils/ImageUtils'
export default {
  props: ['category'],
  data(){
    return {
      image: null,
      mutableCategory: this.category,
      valid: false
    }
  },
  computed:{
    getImage(){
      return this.image || "http://ferreteriaelpuente.com.ar/wp-content/uploads/2015/08/sin-imagen.png"
    }
  },
  methods:{
    click(){
      this.$refs.imageInput.click()
    },
    onPhotoUploaded(e){
      if(e.target.files.length > 0){
        this.mutableCategory.image = this.$refs.imageInput.files[0]
      }else{
        this.mutableCategory.image = null
      }
      imageUtils.getImageFromTarget(this.$refs.imageInput, image => {
        this.image = image
      })
    },
    saveCategory(){
      api.postCategory(this.mutableCategory)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      })
    }
  }
}
</script>

<style lang="css">
</style>
