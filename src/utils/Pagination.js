function getBody(items, pagination){
  let { descending, page, sortBy, rowsPerPage } = pagination
  var params = {
    orderBy: sortBy,
    sorting: (descending !== null) ? (descending ? 'DESC' : 'ASC') : null,
    limit: rowsPerPage
  }
  if( page > 1){
    params.lastRowId = items[items.length - 1].id,
    params.lastRowValue = items[items.length - 1][sortBy || 'created_at']
  }

  return params
}

module.exports = {
  getBody
}
