const { Client } = require('pg')

//Load the database (create it if it doens't exist)
function load(options) {
    const dbName = process.env.DATABASE_NAME,
          username = process.env.DB_USER,
          password = process.env.PASSWORD,
          host = process.env.HOST,
          port = process.env.PORT

    //Connect to the default database with pg
    const conStringPri = 'postgres://'+username+':'+password+'@'+host+':'+port+'/postgres'
    const client = new Client({ connectionString: conStringPri })
    client.connect((err) => {
      //Create the application-specific database
      client.query('CREATE DATABASE ' + dbName, function(err) {
        if(err){
          console.log("Database already created")
        }else{
          console.log("Database created")
        }
        //Close the connection
        client.end()

        //Sync the database with Sequelize
        var db = require('./')
        db.sequelize.sync(options)
      });
    })
};

module.exports = {
  load: load
}
