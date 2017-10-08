const utils = require('../utils/ImageUtils.js')

module.exports = (sequelize, DataTypes) => {
  const SettlementCategory = sequelize.define('settlement_category', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmpty: true
      }
    },
    image: { type: DataTypes.STRING },
    imagePath: {
      type: new DataTypes.VIRTUAL(DataTypes.String, ['image']),
      get: function() { return utils.generateURL(this.image) }
    }
  },{
    underscored: true,
    tableName: 'settlement_category',
  })

  SettlementCategory.afterDestroy((category, options) => {
    if (category.avatar){
      return utils.deleteImage('categories/' + category.image)
    }
  });

  SettlementCategory.associate = function(models){
    SettlementCategory.hasMany(models.Settlement, {as: 'Settlements', foreignKey: 'settlement_category_id'})
  }

  SettlementCategory.modelName = "SettlementCategory"

  return SettlementCategory
}
