export const PaginatedDataTable = {
  data(){
    return {
      items: [],
      loading: true,
      cachedItems: {},
      pagination: {},
      lastPagination: {},
      totalItems: 0,
      rowsPerPage: [4]
    }
  },
  watch: {
    pagination: {
      handler () {

        let newSortBy = this.pagination.sortBy
        let newSorting = this.pagination.descending
        let newPage = this.pagination.page + ''

        let oldSortBy = this.lastPagination.sortBy
        let oldSorting = this.lastPagination.descending
        let oldPage = this.lastPagination.page + ''

        //Return to the first page, clear cache and hit the server again if the sorting changes
        if (oldSortBy !== newSortBy || oldSorting !== newSorting){
          this.pagination.page = 1
          this.cachedItems = {}
          this.getDataFromApi()
        }else if (this.cachedItems.hasOwnProperty(newPage)){ //Use cache for previously returned results
          this.loading= false
          this.items = this.cachedItems[newPage]
        }else{ //Hit the server if there aren't cache entries
          this.getDataFromApi()
        }

        this.lastPagination = this.pagination
      },
      deep: true
    }
  },
}
