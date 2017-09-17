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
    tableName: 'user',

    classMethods: {
      isValidPassword: function(password, passwd, next, user){
        bcrypt.compare(password, passwd, (err, matches) => {
          if (err) console.log(err)
          if (matches){
            return next(null, user)
          }else{
            return next(null, false)
          }
        })
      }
    }
  })

  User.hook('beforeCreate', function(user, fn){
    const salt = bcrypt.getSalt(process.env.SALT_WORK_FACTOR, (err, salt) => {
      return salt;
    })
    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) return next(err)

      user.password = hash
      return fn(null, user)
    })
  })

  User.belongsTo(UserType, { as: 'Type', foreignKey: 'user_type_id' })

  return User
}
