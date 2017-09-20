module.exports = (sequelize, DataTypes) => {
  const UserType = sequelize.define('user_type', {
    name: { type: DataTypes.STRING, allowNull: false }
  },{
    underscored: true,
    tableName: 'user_type',
  })

  UserType.modelName = "UserType"

  return UserType

}
