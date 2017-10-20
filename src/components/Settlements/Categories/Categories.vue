<template lang="html">
  <div>
    <app-categories-list @onNewCategory="right=true">
    </app-categories-list>

    <v-dialog v-model="right" persistent max-width="500px">

      <app-category @onCanceled="right=false" :category="{image: null, name: null}">
      </app-category>

    </v-dialog>
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
