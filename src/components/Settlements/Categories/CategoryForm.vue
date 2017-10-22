<template lang="html">

    <v-card>
      <v-card-title>
        <span class="headline"> {{ title }} </span>
      </v-card-title>
      <v-card-text>
        <v-form v-model="valid" ref="form" width="100%" >
          <app-image-picker v-model="mutableCategory.image"></app-image-picker>

          <v-text-field
            name="name"
            v-model="mutableCategory.name"
            label="Nombre"
            single-line
            :error-messages="$store.state.errors.get('name')"
            :rules="nameRules"
            @change.native="some"
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" flat @click.native="close">Close</v-btn>
        <v-btn color="blue darken-1" flat @click.stop="saveCategory">Save</v-btn>
      </v-card-actions>

      <v-snackbar
        :timeout="3000"
        :bottom="true"
        v-model="snackbar"
        v-if="getStatus"
      >
        {{ $store.state.status.message }}
        <v-btn flat color="pink" @click.native="snackbar = false">Close</v-btn>
      </v-snackbar>

    </v-card>

</template>

<script>
import imagePicker from '../../shared/ImagePicker.vue'
import api from '../../../api/Settlement'
import imageUtils from '../../../utils/ImageUtils'
import rules from '../../../utils/Rules'

import { mapGetters } from 'vuex'

export default {
  props: ['category'],
  components:{
    'app-image-picker': imagePicker,
  },
  computed: {
    nameRules(){
      return [
        rules.isEmpty(this.mutableCategory.name)
      ]
    },
    ...mapGetters([
      'getStatus',
      'isFailed',
      'isSuccess'
    ])
  },
  watch:{
    getStatus(val){
      if(val){
        this.snackbar = (this.isFailed)
        if(this.isSuccess){
          this.$emit('onCanceled')
        }
      }else{
        this.snackbar = false
      }
    }
  },
  data(){
    return {
      mutableCategory: this.category,
      valid: false,
      title: 'Nueva categoría',
      snackbar: false
    }
  },
  methods:{
    close(){
      this.$emit('onCanceled')
    },
    saveCategory(){
      if (this.$refs.form.validate()){
        this.$store.dispatch('postCategory', {
          category: this.mutableCategory
        })
      }
    },
    some(a){
      this.$store.commit('clearError', a.target.name)
    }
  }
}
</script>
