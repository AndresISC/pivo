<template>
  <v-app>
    <v-data-table
      v-bind:headers="headers"
      v-bind:items="items"
      v-bind:search="search"
      v-bind:pagination.sync="pagination"
      :rows-per-page-items="rowsPerPage"
      :total-items="totalItems"
      :loading="loading"
      :rows-per-page-text="rowsPerPageText"
      class="elevation-1"
    >
      <template slot="items" scope="props">
        <td  class="text-xs-center"><img class="avatar" :src="props.item.avatarPath"/></td>
        <td  class="text-xs-right">{{ props.item.firstName }}</td>
        <td  class="text-xs-right">{{ props.item.lastName }}</td>
        <td  class="text-xs-right">{{ props.item.email }}</td>
      </template>
    </v-data-table>
  </v-app>
</template>

<script>
  import userService from '../api/User'
  import pagination from '../utils/Pagination'
  import { PaginatedDataTable } from '../mixins/PaginatedDataTable'

  export default {
    mixins: [PaginatedDataTable],
    data () {
      return {
        search: '',
        rowsPerPageText:"Registros por página:",
        headers: [
          { text: 'Avatar',
            align: 'center',
            sortable: false,
            align:'center',
            value: 'avatarPath'
          },
          {
            text: 'Nombre',
            value: 'firstName'
          },
          { text: 'Apellido',
            value: 'lastName'
          },
          { text: 'Correo',
            value: 'email'
          }
        ]
      }
    },
    methods: {
      getDataFromApi(){
        this.getUsers()
        .then(data => {
          var newPage = this.pagination.page + ''
          this.loading= false
          this.items = data.data
          this.totalItems = 21
          this.cachedItems[newPage] = data.data
        })
      },

      getUsers () {
        this.loading = true
        let params = pagination.getBody(this.items, this.pagination)
        return userService.getUsers(params)
      }
    }
  }
</script>

<style>
  .avatar{
    width: 70px;
    height: 70px;
  }

  td{
    height: 90px !important;
  }
</style>
