<template>
  <v-card class="card--flex-toolbar">
    <v-card-media class="white--text" :height="height" :src="src">
      <slot name="media"></slot>
    </v-card-media>

    <v-card-title primary-title class="pink lighten-1">
      <div class="headline white--text">
        {{ title }}
      </div>
    </v-card-title>

    <v-card-text >
      <slot name="content"></slot>
    </v-card-text>

    <v-card-actions>
      <slot name="action"></slot>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'AppCard',
  props: ['height', 'src'],
  data(){
    return {
      title: 'Login'
    }
  }
}
</script>
