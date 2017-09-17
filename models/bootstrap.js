const { Client } = require('pg')
const db = require('./')

function load(options) {
    const dbName = process.env.DATABASE_NAME,
          username = process.env.DB_USER,
          password = process.env.PASSWORD,
          host = process.env.HOST,
          port = process.env.PORT

    const conStringPri = 'postgres://'+username+':'+password+'@'+host+':'+port+'/postgres'

    const client = new Client({ connectionString: conStringPri })
    client.connect((err) => {
      client.query('CREATE DATABASE ' + dbName, function(err) {
        if(err){
          console.log("Database already created")
        }else{
          console.log("Database created")
        }
        client.end()
        db.sequelize.sync(options)
      });
    })
};

module.exports = {
  load: load
}
