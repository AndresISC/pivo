<template>
  <div v-if="settlement">
    <h6>Profile</h6>
    <p> {{ settlement.name }}</p>
    <p> {{ settlement.email }} </p>
    <p> {{ settlement.phone }} </p>
    <p> {{ settlement.url }} </p>
  </div>
</template>


<script>
  export default {
    props:['settlement'],
    data () {
      return {

      }
    }
  }
</script>


<style lang="css">
</style>
