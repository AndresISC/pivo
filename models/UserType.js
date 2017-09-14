module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define('user_type', {
    name: { type: DataTypes.STRING, allowNull: false }
  },{
    underscored: true,
    tableName: 'user_type',
  })

  return model

}
