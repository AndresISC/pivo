<template lang="html">
  <div>
    <app-categories-list @onNewCategory="right=true">
    </app-categories-list>

    <v-navigation-drawer
      right
      temporary
      v-model="right"
      absolute
      v-bind:class="{ open: right }"
    >
    <app-category :category="{image: null, name: null}"></app-category>

    </v-navigation-drawer>
  </div>
</template>

<script>
import categoriesList from './CategoriesList.vue'
import category from './CategoryForm.vue'
export default {
  components:{
    'app-categories-list': categoriesList,
    'app-category': category
  },
  data(){
    return {
      right: null
    }
  }
}
</script>

<style lang="css">
.open{
  width: 500px;
}
</style>
