<template lang="html">

  <v-container fluid grid-list-sm class="mt-4">
    <v-layout row wrap>
      <v-flex d-flex xs8 offset-xs2>
        <v-card>
          <v-card-title>
            <h5>Categorías de negocios</h5>
            <v-btn
              absolute
              dark
              fab
              top
              left
              class="pink"
              style="margin-top: 80px;"
              @click.stop="onNewCategory"
            >
              <v-icon>add</v-icon>
            </v-btn>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-layout v-if="categories.length > 0"  row wrap>
              <v-flex d-flex xs4 v-for="(category, index) in categories" :key="category.id">
                <app-category
                  @onCategoryDeleted="deleteCategory"
                  :category="category" :i="index"/>
              </v-flex>
            </v-layout>
            <p v-else class="text-xs-center ma-0">No hay categorías registradas</p>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>

</template>

<script>
import api from '../../../api/Settlement'
import category from './Category.vue'
export default {
  components:{
    'app-category': category
  },
  data(){
    return {
      categories: []
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
    deleteCategory(payload){
      this.categories.splice(payload.i, 1)
    },
    onNewCategory(){
      this.$emit('onNewCategory')
    }
  }
}
</script>
