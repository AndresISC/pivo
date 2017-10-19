<template lang="html">
  <div class="pa-4">

    <v-form v-model="valid" ref="form" width="100%">
      <input ref="imageInput" type="file" hidden @change="onPhotoUploaded">

      <v-flex xs6 offset-xs3  class="text-xs-center">
        <img :src="getImage" width="100%" height="240px" @click.stop="click">
      </v-flex>

      <app-date-picker
        :date.sync="promotion.startDate"
        label="Fecha de inicio"
      >
      </app-date-picker>

      <app-date-picker
        :date.sync="promotion.endDate"
        label="Fecha de término"
      >
      </app-date-picker>

      <v-text-field
        prepend-icon="description"
        v-model="promotion.description"
        name="input-1"
        label="Descripción"
        multi-line
      ></v-text-field>

      <v-btn @click.stop="savePromotion">
        click
      </v-btn>
    </v-form>


  </div>

</template>

<script>
import datePicker from '../../shared/DatePicker.vue'
import imageUtils from '../../../utils/ImageUtils'
import api from '../../../api/Settlement'
export default {
  props: {
    promotion: {
      type: Object,
      required: true
    },
    sid:{
      type: Number,
      required: true
    }
  },
  components:{
    'app-date-picker': datePicker
  },
  data(){
    return {
        valid: false,
        image: null
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
        this.promotion.image = this.$refs.imageInput.files[0]
      }else{
        this.promotion.image = null
      }
      imageUtils.getImageFromTarget(this.$refs.imageInput, image => {
        this.image = image
      })
    },

    savePromotion(){
      api.postPromotion(this.sid, this.promotion)
      .then(res => {
        console.log(res.data.payload);
      })
      .catch(err => {
        console.log(err.response);
      })
    }
  }
}
</script>

<style lang="css">

.hide{
  display: none;
}

img {
  border-radius: 10px;
  width:200px;
  height:200px;
  /*width: auto;
  height: auto;*/
}
</style>
