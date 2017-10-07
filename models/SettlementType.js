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

  SettlementType.associate = function(models){
    SettlementType.hasMany(models.Settlement, {as: 'Settlements', foreignKey: 'settlement_type_id'})
  }

  SettlementType.modelName = "SettlementType"

  return SettlementType
}
