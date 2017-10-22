<template lang="html">
  <div class="black--text category-container">
    <v-container fluid grid-list-lg>
      <v-layout row>
        <v-flex xs3>
          <img
            :src="category.imageUrl"
            height="70px"
          />
        </v-flex>
        <v-flex xs6 >
          <div class="headline" height="100%" style="vertical-align: middle;">
            <p >{{ category.name }}</p>
          </div>
        </v-flex>
        <v-flex xs1 class="hidden">
          <v-btn icon >
            <v-icon>edit</v-icon>
          </v-btn>
        </v-flex>
        <v-flex xs1 class="hidden">
          <v-btn icon @click.stop="deleteCategory">
            <v-icon>delete</v-icon>
          </v-btn>
        </v-flex>

      </v-layout>
    </v-container>
  </div>
</template>

<script>

export default {
  props:['category', 'i'],
  methods:{
    deleteCategory(){
      this.$store.dispatch('deleteCategory', {
        categoryId: this.category.id,
        index: this.i
      })
    }
  }
}
</script>

<style lang="css">
  .category-container:hover{
    background-color: #eceff1 ;
  }
  .hidden { display:none; }
  .category-container:hover .hidden { display:block; }
</style>
