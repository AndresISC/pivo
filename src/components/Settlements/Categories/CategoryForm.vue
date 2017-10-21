<template lang="html">

    <v-card>
      <v-card-title>
        <span class="headline"> {{ title }} </span>
      </v-card-title>
      <v-card-text>
        <v-form v-model="valid" ref="form" width="100%">
          <app-image-picker v-model="mutableCategory.image"></app-image-picker>

          <v-text-field
            name="name"
            v-model="mutableCategory.name"
            label="Nombre"
            single-line
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
        v-if="snackbar"
      >
        {{ $store.state.status.message }}
        <v-btn flat color="pink" @click.native="snackbar = null">Close</v-btn>
      </v-snackbar>

    </v-card>

</template>

<script>
import imagePicker from '../../shared/ImagePicker.vue'
import api from '../../../api/Settlement'
import imageUtils from '../../../utils/ImageUtils'

export default {
  props: ['category'],
  components:{
    'app-image-picker': imagePicker,
  },
  computed:{
    snackbar:{
      get()      { return this.$store.getters.hasStatus },
      set(value) { this.$store.commit('setStatus',{status: value}) }
    }
  },
  data(){
    return {
      mutableCategory: this.category,
      valid: false,
      title: 'Nueva categoría'
    }
  },
  methods:{
    close(){
      this.$emit('onCanceled')
    },
    saveCategory(){
      this.$store.dispatch('postCategory', {
        category: this.mutableCategory
      })

    }
  }
}
</script>
