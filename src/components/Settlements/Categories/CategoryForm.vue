<template lang="html">
  <div class="pa-4">

    <v-form v-model="valid" ref="form" width="100%">
      <app-image-picker v-model="mutableCategory.image"></app-image-picker>

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
import imagePicker from '../../shared/ImagePicker.vue'
import api from '../../../api/Settlement'
import imageUtils from '../../../utils/ImageUtils'
export default {
  props: ['category'],
  components:{
    'app-image-picker': imagePicker
  },
  data(){
    return {
      mutableCategory: this.category,
      valid: false
    }
  },
  methods:{
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
