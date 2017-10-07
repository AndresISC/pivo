const bcrypt = require('bcrypt')
const utils = require('../utils/ImageUtils.js')

module.exports = (sequelize, DataTypes) => {
  const UserType = sequelize.import('./UserType')

  const User = sequelize.define('user', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'first_name'
    },
    lastName: {
      type: DataTypes.STRING,
      field: 'last_name'
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true,
        notEmpty:true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true }
    },
    avatar: {
      type: DataTypes.STRING,
      field: 'image'
    },
    avatarPath: {
      type: new DataTypes.VIRTUAL(DataTypes.String, ['avatar']),
      get: function() { return utils.generateURL(this.avatar) }
    }

  },
  {
    underscored: true,
    tableName: 'pivo_user'
  })

  //Extend the model with a function used to compare a plain text password with the hashed password stored in the database
  User.prototype.isValidPassword = function(password){
    return bcrypt.compare(password, this.password)
  }

  User.afterDestroy((user, options) => {
    if (user.avatar){
      return utils.deleteImage('users/' + user.avatar)
    }
  });

  //Trigger to hash a plain text password before it gets stored in the database
  User.beforeCreate( (user, options) => {
    return bcrypt.genSalt(10)
    .then( salt => {
      //Hash the password
      return bcrypt.hash(user.password, salt)
      .then( hash => {
        //Update the user with the new hashed password
        user.password = hash
      })
      .catch( err => {
        console.log(err);
      })
    })
    .catch( err => {
      console.log(err);
    })
  })

  User.belongsTo(UserType, { as: 'Type', foreignKey: 'user_type_id' })

  User.modelName = "User"

  return User
}
