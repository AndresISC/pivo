module.exports = (sequelize, DataTypes) => {
  const SettlementType = sequelize.define('settlement_type', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmpty: true
      }
    },
    image_path: { type: DataTypes.STRING }
  },{
    underscored: true,
    tableName: 'settlement_type',
  })

  SettlementType.modelName = "SettlementType"

  return SettlementType
}
