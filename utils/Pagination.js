
/**
* Predicate used to perform a key-value pagination.
* The predicate is the Sequelize equivalent to the next SQL condition:
  WHERE (
      (orderByColumn < ?)
      OR
      (orderByColumn = ? AND primaryKey < ?)
  )
* For more information about this topic see:
* {@link http://use-the-index-luke.com/sql/partial-results/fetch-next-page#sb-row-values}.
*/
function getSeekPredicate(orderBy, sorting, lastRowValue, lastRowId){
  var literal = sorting === 'DESC' ? "$lt" : "$gt"
  var cond =
  {
    $or:[
      {
        [orderBy]:{
          [literal]: lastRowValue
        }
      },{
        $and:[
          {
            [orderBy]: lastRowValue
          },{
            id:{
              $lt: lastRowId
            }
          }
        ]
      }
    ]
  }

  return cond
}

function getBodyForPagingation(lastRowId, lastRowValue, orderBy, sorting, limit){
  var seekPredicate = getSeekPredicate(orderBy, sorting, lastRowValue, lastRowId)

  var body = {
    where: seekPredicate,
    order: [
      [orderBy, sorting],
      ['id', 'DESC']
    ],
    limit: limit
  }

  return body
}

function getBodyWithoutPagination(orderBy, sorting, limit){
  var body = {
    order: [[orderBy, sorting]],
    limit: limit
  }

  return body
}

function getBody(req){

  //Last values seen by the user. Needed to perform a key-value pagination
  var lastRowId = req.query.lastRowId
  var lastRowValue =  req.query.lastRowValue

  //Extra parameters used to display the data in a given way
  var orderBy = (typeof req.query.orderBy === 'undefined') ? 'created_at' : req.query.orderBy
  var sorting = (typeof req.query.sorting === 'undefined') ? 'DESC' : req.query.sorting
  var limit = (typeof req.query.limit === 'undefined') ? '15' : req.query.limit

  //Only perform pagination if the client submitted the last seen values
  if (typeof lastRowId !== 'undefined' && typeof lastRowValue !== 'undefined'){
    return getBodyForPagingation(lastRowId, lastRowValue, orderBy, sorting, limit)
  }else{
    return getBodyWithoutPagination(orderBy, sorting, limit)
  }
}

module.exports = {
  getBody
}
