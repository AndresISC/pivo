<template lang="html">
  <div class="pa-4">

    <v-form v-model="valid" ref="form" width="100%">
      <app-image-picker v-model="promotion.image"></app-image-picker>

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
import imagePicker from '../../shared/ImagePicker.vue'
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
    'app-date-picker': datePicker,
    'app-image-picker': imagePicker
  },
  data(){
    return {
        valid: false
    }
  },
  methods:{
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
</style>
