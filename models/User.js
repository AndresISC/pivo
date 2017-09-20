const bcrypt = require('bcrypt')

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
    avatarPath: {
      type: DataTypes.STRING,
      field: 'avatar_path'
    }
  },
  {
    underscored: true,
    tableName: 'pivo_user'
  })

  User.prototype.isValidPassword = function(password){
    return bcrypt.compare(password, this.password)
  }

  User.beforeCreate( (user, options) => {
    return bcrypt.genSalt(10)
    .then( salt => {
      return bcrypt.hash(user.password, salt)
      .then( hash => {
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
