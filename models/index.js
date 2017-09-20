var fs        = require("fs");
var path      = require("path");
var Sequelize = require("sequelize");

const dbName = process.env.DATABASE_NAME,
      username = process.env.DB_USER,
      password = process.env.PASSWORD,
      host = process.env.HOST,
      port = process.env.PORT

const conStringPost = 'postgres://'+username+':'+password+'@'+host+':'+port+'/'+dbName
const sequelize = new Sequelize(conStringPost)

var db = {};

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf(".") !== 0) &&
           (file !== "index.js") &&
           (file != "bootstrap.js") &&
           (file != "Response.js");
  })
  .forEach(function(file) {
    var model = sequelize.import(path.join(__dirname, file));
    //var modelName = model.name.charAt(0).toUpperCase() + model.name.slice(1)
    var modelName = model.modelName
    console.log(modelName);

    db[modelName] = model;
  });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
