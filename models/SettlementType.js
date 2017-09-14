module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define('settlement_type', {
    name: { type: DataTypes.STRING, allowNull: false }
  },{
    underscored: true,
    tableName: 'settlement_type',
  })

  return model
}
