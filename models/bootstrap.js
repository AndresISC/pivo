const Sequelize = require('sequelize'),
      { Client } = require('pg')

function load(callback) {
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

module.exports.init = function(callback){
  load( sequelize => {
    const promotion = sequelize.import('./Promotion')

    const userType = sequelize.import('./UserType')
    const user = sequelize.import('./User')

    const settlementGallery = sequelize.import('./settlementGallery')
    const settlementType = sequelize.import('./SettlementType')
    const settlement = sequelize.import('./Settlement')

    const models = {
      Promotion: promotion,
      UserType: userType,
      User: user,
      SettlementGallery: settlementGallery,
      SettlementType: settlementType,
      Settlement: settlement
    }

    //Will delete all the tables and recreate them. Use carefully
    sequelize.sync({force: true})

    callback(models)
  });
}
