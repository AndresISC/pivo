<template lang="html">

  <v-menu
    lazy
    :close-on-content-click="false"
    v-model="menu"
    transition="scale-transition"
    offset-y
    full-width
    :nudge-right="40"
    max-width="290px"
    min-width="290px"
  >
    <v-text-field
      slot="activator"
      :label="label"
      :rules="rules || []"
      v-model="formatted"
      prepend-icon="event"
      readonly
    ></v-text-field>
    <v-date-picker
      :date-format="date => new Date(date).toDateString()"
      :formatted-value.sync="formatted"
      v-model="mutableDate"
      no-title
      scrollable
      actions>
      <template slot-scope="{ save, cancel }">
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat color="primary" @click="cancel">Cancel</v-btn>
          <v-btn flat color="primary" @click="save">OK</v-btn>
        </v-card-actions>
      </template>
    </v-date-picker>
  </v-menu>

</template>

<script>
export default {
  props: ['date', 'label', 'rules'],
  data(){
    return {
      menu: false,
      formatted: null,
      mutableDate: this.date
    }
  },
  watch:{
    mutableDate(){
      this.$emit('update:date', this.mutableDate)
    }
  }
}
</script>

<style lang="css">
</style>
