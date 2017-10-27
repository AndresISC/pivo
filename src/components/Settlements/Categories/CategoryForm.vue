<template lang="html">

    <v-card>
      <v-card-title>
        <span class="headline"> {{ title }} </span>
      </v-card-title>
      <v-card-text>
        <v-form v-model="valid" ref="form" width="100%" @change.native="clearError">
          <app-image-picker v-model="mutableCategory.image"></app-image-picker>
          <v-text-field
            name="name"
            v-model="mutableCategory.name"
            label="Nombre"
            single-line
            :error-messages="getError('name')"
            :rules="nameRules"
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
        {{ $store.state.categories.status.message }}
        <v-btn flat color="pink" @click.native="snackbar = false">Close</v-btn>
      </v-snackbar>

    </v-card>

</template>

<script>
import imagePicker from '../../shared/ImagePicker.vue'
import api from '../../../api/Settlement'
import imageUtils from '../../../utils/ImageUtils'
import rules from '../../../utils/Rules'
import { CLEAR_ERROR } from '../../../store/mutation-types'
import { mapGetters, mapActions, mapMutations} from 'vuex'

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
    ...mapGetters('categories',[
      'getStatus',
      'isFailed',
      'isSuccess',
      'getError'
    ])
  },
  watch:{
    getStatus(val){
      this.snackbar = this.isFailed
      if(this.isSuccess){
        this.close()
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
    ...mapMutations('categories', [ CLEAR_ERROR ]),
    ...mapActions('categories',[ 'postCategory' ]),
    close(){
      this.$emit('onClosed')
    },
    saveCategory(){
      if (this.$refs.form.validate()){
        this.postCategory({ category: this.mutableCategory })
      }
    },
    clearError(e){
      this[CLEAR_ERROR]({ key: e.target.name })
    }
  }
}
</script>
