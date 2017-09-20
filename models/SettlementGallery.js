module.exports = (sequelize, DataTypes) => {

  const SettlementGallery = sequelize.define('settlement_gallery', {
    imagePath: {
      type: DataTypes.STRING,
      field: 'image_path'
    }
  },{
    underscored: true,
    tableName: 'settlement_gallery',
  })

  SettlementGallery.modelName = "SettlementGallery"

  return SettlementGallery
}
