var fs        = require("fs");
var path      = require("path");
var Sequelize = require("sequelize");

const dbName = process.env.DATABASE_NAME,
      username = process.env.DB_USER,
      password = process.env.PASSWORD,
      host = process.env.HOST,
      port = process.env.PORT

//Connect to the databse with Sequelize
const conStringPost = 'postgres://'+username+':'+password+'@'+host+':'+port+'/'+dbName
const sequelize = new Sequelize(conStringPost)

//The JSON which will contain every model of the database
var db = {};

//Read all the model files in the directory
fs
  .readdirSync(__dirname)
  .filter(function(file) {
    //Ignore some auxiliar files
    return (file.indexOf(".") !== 0) &&
           (file !== "index.js") &&
           (file != "bootstrap.js") &&
           (file != "Response.js");
  })
  .forEach(function(file) {
    //Import the model of each file
    var model = sequelize.import(path.join(__dirname, file));
    var modelName = model.modelName
    //Extend every model with a 'seek' function to perform key-value pagination
    model.seek = function(req){
      var pagination = require('../utils/Pagination')
      var body = pagination.getBody(req)
      return model.findAll(body)
    }


    //Store every model in the exported JSON
    db[modelName] = model;
  });

//Store some other useful properties like the sequelize connection and the Sequelize module
db.sequelize = sequelize;
db.Sequelize = Sequelize;

//Export the motherfucker
module.exports = db;
