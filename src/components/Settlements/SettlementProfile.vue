<template lang="html">

  <v-form v-model="valid" ref="form" width="100%" @submit.prevent="submitt" action="http://localhost/settlements" method="post">
    <v-container fluid grid-list-md class="pa-4" >

      <input ref="imageInput" type="file" hidden @change="onPhotoUploaded">
      <v-flex xs6 offset-xs3  class="text-xs-center">
        <img :src="getImage" width="100%" height="200px" @click.stop="click">
      </v-flex>

      <v-flex xs12 >
        <v-text-field
          name="name"
          v-model="mutableSettlement.name"
          label="Nombre"
          single-line
          prepend-icon="business"
        ></v-text-field>
      </v-flex>

      <v-flex xs12 >
        <v-text-field
          name="email"
          v-model="mutableSettlement.email"
          label="Email"
          single-line
          prepend-icon="email"
        ></v-text-field>
      </v-flex>

      <v-flex xs12 >
        <v-text-field
          name="phone"
          v-model="mutableSettlement.phone"
          label="Teléfono"
          single-line
          prepend-icon="phone"
        ></v-text-field>
      </v-flex>

      <v-flex xs12 >
        <v-text-field
          name="phone"
          v-model="mutableSettlement.url"
          label="Sitio web"
          single-line
          prepend-icon="public"
        ></v-text-field>
      </v-flex>

      <v-flex xs12 >
        <v-text-field
          name="phone"
          v-model="mutableSettlement.facebookUrl"
          label="Facebook"
          single-line
          prepend-icon="group"
        ></v-text-field>
      </v-flex>

      <v-flex xs12 >
        <v-text-field
          prepend-icon="description"
          v-model="mutableSettlement.description"
          name="input-1"
          label="Descripción"
          multi-line
        ></v-text-field>
      </v-flex>

      <v-icon class="left-icon">
        map
      </v-icon>
      <span class="icon-label" >Ubicación</span>

      <div class="left-space">

        <v-layout row wrap>
          <v-flex xs6 class="ma-6">
            <v-text-field
              name="phone"
              v-model="mutableSettlement.latitude"
              label="Latitud"
              single-line

            ></v-text-field>
          </v-flex>

          <v-flex xs6 >
            <v-text-field
              name="phone"
              v-model="mutableSettlement.longitude"
              label="Longitd"
              single-line
            ></v-text-field>
          </v-flex>
        </v-layout>

      </div>


      <v-btn type="submit">
        click
      </v-btn>
    </v-container>
  </v-form>

</template>

<script>
import imageUtils from '../../utils/ImageUtils'
import api from '../../api/Settlement'
export default {
  props:['settlement'],
  data(){

    return{
      valid: false,
      image: null,
      mutableSettlement: this.settlement
    }
  },
  methods:{
    click(){
      this.$refs.imageInput.click()
    },

    onPhotoUploaded(e){
      if(e.target.files.length > 0){
        this.mutableSettlement.image = this.$refs.imageInput.files[0]
      }else{
        this.mutableSettlement.image = null
      }
      imageUtils.getImageFromTarget(this.$refs.imageInput, image => {
        this.image = image
      })
    },
    submitt(data){
      api.postSettlement(this.mutableSettlement)
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.log(err.response.data.errors);
      })
    }
  },
  computed:{
    getImage(){
      return this.image || "http://ferreteriaelpuente.com.ar/wp-content/uploads/2015/08/sin-imagen.png"
    }
  },

}
</script>

<style lang="css">
  .icon-label{
    color: rgba(0,0,0,.54);
    font-size: 16px;
    line-height: 32px;
    height: 30px;
  }
  .left-icon{
    justify-content: flex-start;
    width: 40px;
  }

  .left-space{
    margin-left: 40px;
  }
</style>
