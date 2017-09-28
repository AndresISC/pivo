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
      <template slot="headerCell" scope="props">
        <span v-tooltip:bottom="{ 'html': props.header.text }">
          {{ props.header.text }}
        </span>
      </template>
      <template slot="items" scope="props">
        <td  class="text-xs-center"><img class="avatar" :src="props.item.avatar"/></td>
        <td  class="text-xs-right">{{ props.item.firstName }}</td>
        <td  class="text-xs-right">{{ props.item.lastName }}</td>
        <td  class="text-xs-right">{{ props.item.email }}</td>
      </template>
    </v-data-table>
  </v-app>
</template>



<script>
  export default {
    data () {
      return {
        search: '',
        totalItems: 0,
        items: [],
        rowsPerPage: [15],
        rowsPerPageText:"Registros por página:",
        loading: true,
        pagination: {},
        headers: [
          { text: 'Avatar',
            align: 'center',
            sortable: false,
            align:'center',
            value: 'avatar'
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
    watch: {
      pagination: {
        handler () {
          this.getDataFromApi()
            .then(data => {
              this.items = data.items
              this.totalItems = data.total
            })
        },
        deep: true
      }
    },
    mounted () {
      this.getDataFromApi()
        .then(data => {
          this.items = data.items
          this.totalItems = data.total
        })
    },
    methods: {
      getDataFromApi () {
        this.loading = true
        return new Promise((resolve, reject) => {
          const { sortBy, descending, page, rowsPerPage } = this.pagination

          let items = this.getDesserts()
          const total = items.length

          if (this.pagination.sortBy) {
            items = items.sort((a, b) => {
              const sortA = a[sortBy]
              const sortB = b[sortBy]

              if (descending) {
                if (sortA < sortB) return 1
                if (sortA > sortB) return -1
                return 0
              } else {
                if (sortA < sortB) return -1
                if (sortA > sortB) return 1
                return 0
              }
            })
          }

          if (rowsPerPage > 0) {
            items = items.slice((page - 1) * rowsPerPage, page * rowsPerPage)
          }

          setTimeout(() => {
            this.loading = false
            resolve({
              items,
              total
            })
          }, 1000)
        })
      },
      getDesserts () {
        return [
          {
            value: false,
            firstName: 'Arturo',
            lastName: "Gasca Ortega",
            email: "agasca1994@gmail.com",
            avatar: "http://ironmaiden.com/media/images/24-bit-flac.jpg"
          },
          {
            value: false,
            firstName: 'Arturo',
            lastName: "Gasca Ortega",
            email: "agasca1994@gmail.com",
            avatar: "http://ironmaiden.com/media/images/24-bit-flac.jpg"
          },
          {
            value: false,
            firstName: 'Arturo',
            lastName: "Gasca Ortega",
            email: "agasca1994@gmail.com",
            avatar: "http://ironmaiden.com/media/images/24-bit-flac.jpg"
          }
        ]
      }
    }
  }
</script>

<style>
  @import '../../node_modules/vuetify/dist/vuetify.min.css';
  .avatar{
    width: 70px;
    height: 70px;
  }

  td{
    height: 90px !important;
  }

  body{
    padding: 30px;
  }


</style>
