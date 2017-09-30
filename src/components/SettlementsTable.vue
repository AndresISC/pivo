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
        <td  class="text-xs-center"><img class="avatar" :src="props.item.imagePath"/></td>
        <td  class="text-xs-right">{{ props.item.name }}</td>
        <td  class="text-xs-right">{{ props.item.email }}</td>
        <td  class="text-xs-right">{{ props.item.url }}</td>
        <td  class="text-xs-right">{{ props.item.facebookUrl }}</td>
        <td  class="text-xs-right">{{ props.item.phone }}</td>
        <td  class="text-xs-right">{{ props.item.latitude }}</td>
        <td  class="text-xs-right">{{ props.item.longitude }}</td>
      </template>
    </v-data-table>
  </v-app>
</template>

<script>
  import service from '../api/Settlement'
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
            value: 'imagePath'
          },
          {
            text: 'Nombre',
            value: 'name'
          },
          { text: 'Correo',
            value: 'email'
          },
          { text: 'Sitio web',
            value: 'url'
          },
          { text: 'Facebook',
            value: 'facebookUrl'
          },
          { text: 'Teléfono',
            value: 'phone'
          },
          { text: 'Latitud',
            value: 'latitude'
          },
          { text: 'Longitud',
            value: 'longitude'
          },
        ]
      }
    },
    methods: {
      getDataFromApi(){
        this.getSettlements()
        .then(data => {
          var newPage = this.pagination.page + ''
          this.loading= false
          this.items = data.data
          this.totalItems = 21
          this.cachedItems[newPage] = data.data
        })
      },

      getSettlements () {
        this.loading = true
        let params = pagination.getBody(this.items, this.pagination)
        return service.getSettlements(params)
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
