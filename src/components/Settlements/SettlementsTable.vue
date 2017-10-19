<template>
  <div class="pl-3 pr-3 pt-3">
    <v-card class="card--flex-toolbar" >
      <v-card-title>
        <h5>Lista de negocios</h5>
        <v-btn
          absolute
          dark
          fab
          top
          left
          class="pink"
          style="margin-top: 80px;"
        >
          <v-icon>add</v-icon>
        </v-btn>
      </v-card-title>

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
          <td  class="text-xs-center image-col"><img class="avatar" :src="props.item.imagePath"/></td>
          <td  class="text-xs-right body-2">{{ props.item.name }}</td>
          <td  class="text-xs-right body-2">{{ props.item.email }}</td>
          <td  class="text-xs-right body-2">{{ props.item.phone }}</td>
          <td  class="text-xs-right body-2"><a v-if="props.item.url" :href="props.item.url">{{ props.item.name }}</a></td>
          <td  class="text-xs-right body-2"><a v-if="props.item.facebookUrl" :href="props.item.facebookUrl">{{ props.item.name }}</a></td>
          <td  class="text-xs-right body-2">
            <v-btn icon class="pink--text" @click.stop="selectSettlement(props.item)">
              <v-icon>info</v-icon>
            </v-btn>
          </td>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
  import service from '../../api/Settlement'
  import pagination from '../../utils/Pagination'
  import { PaginatedDataTable } from '../../mixins/PaginatedDataTable'

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
          { text: 'Teléfono',
            value: 'phone'
          },
          { text: 'Sitio web',
            value: 'url'
          },
          { text: 'Facebook',
            value: 'facebookUrl'
          },
          {
            text: 'Más detalles',
            value: 'id'
          }

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
      },

      selectSettlement(settlement){
        bus.fire('onSettlementSelected', settlement)
      }
    }
  }
</script>

<style>

  .avatar{
    width: 65px;
    height: 65px;
  }

  .image-col{
    height: 75px !important;
  }
</style>
