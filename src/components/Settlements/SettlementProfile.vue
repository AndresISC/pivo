<template lang="html">

  <v-form v-model="valid" ref="form" width="100%" @submit.prevent="submitt" action="http://localhost/settlements" method="post">
    <v-container fluid grid-list-md class="pa-4" >

      <app-image-picker v-model="mutableSettlement.image"></app-image-picker>

      <v-flex xs12 >
        <v-text-field
          name="name"
          v-model="mutableSettlement.name"
          label="Nombre"
          single-line
          prepend-icon="business"
        ></v-text-field>
      </v-flex>

      <v-flex xs12>
        <v-select
          :items="categories"
          v-model="mutableSettlement.categoryId"
          label="Categoría"
          single-line
          auto
          prepend-icon="map"
          item-text="name"
          item-value="id"
        >
          <template slot="item" slot-scope="data">
            <template>
              <v-list-tile-avatar>
                <img :src="data.item.imagePath"/>
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title v-html="data.item.name"></v-list-tile-title>
              </v-list-tile-content>
            </template>
          </template>
        </v-select>
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
import api from '../../api/Settlement'
import imagePicker from '../shared/ImagePicker.vue'
export default {
  props:['settlement'],
  components:{
    'app-image-picker': imagePicker
  },
  data(){
    return{
      valid: false,
      mutableSettlement: this.settlement,
      categories: [],
    }
  },
  mounted(){
    this.getCategories()
  },
  methods:{
    getCategories(){
      api.getCategories()
      .then(res => {
        this.categories = res.data.payload.categories
      })
      .catch(err => {
        console.log(err);
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
  }
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
