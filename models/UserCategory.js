module.exports = (sequelize, DataTypes) => {
  const UserCategory = sequelize.define('user_category', {
    name: { type: DataTypes.STRING, allowNull: false }
  },{
    underscored: true,
    tableName: 'user_category',
  })

  UserCategory.modelName = "UserCategory"

  return UserCategory

}
