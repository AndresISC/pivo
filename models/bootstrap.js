const Sequelize = require('sequelize'),
      { Client } = require('pg')

module.exports.init = function(callback) {
    const dbName = process.env.DATABASE_NAME,
        username = process.env.DB_USER,
        password = process.env.PASSWORD,
        host = process.env.HOST,
        port = process.env.PORT

    const conStringPri = 'postgres://'+username+':'+password+'@'+host+':'+port+'/postgres'
    const conStringPost = 'postgres://'+username+':'+password+'@'+host+':'+port+'/'+dbName


    const client = new Client({
      connectionString: conStringPri
    })
    client.connect((err) => {
      client.query('CREATE DATABASE ' + dbName, function(err) {
        if(err){
          console.log("Database already created")
        }else{
          console.log("Database created")
        }
        const sequelize = new Sequelize(conStringPost)
        callback(sequelize)
        client.end()
      });
    })
};
