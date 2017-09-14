
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
      allowNull: false,
      validate: { isEmail: true}
    },
    avatarPath: {
      type: DataTypes.STRING,
      field: 'avatar_path'
    }
  },{
    underscored: true,
    tableName: 'user',
  })

  User.belongsTo(UserType, { as: 'Type', foreignKey: 'user_type_id' })

  return User
}
