const utils = require('../utils/ImageUtils.js')

module.exports = (sequelize, DataTypes) => {
  const SettlementCategory = sequelize.define('settlement_category', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
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

  SettlementCategory.beforeSave((category, options) => {
    if(options.files){
      var imageName = utils.generateImageName('category')
      category.image = imageName
    }
  })

  SettlementCategory.afterSave((category, options) => {
    if (category.changed("image") && options.files){
      if (category.previous("image")){
        utils.deleteImage('categories/' + category.previous("image"))
      }
      return utils.saveImageObj(options.files.image, category.image, 'categories')
    }
  })

  SettlementCategory.afterDestroy((category, options) => {
    if (category.image){
      utils.deleteImage('categories/' + category.image)
    }
  });

  SettlementCategory.associate = function(models){
    SettlementCategory.hasMany(models.Settlement, {as: 'Settlements', foreignKey: {name: 'categoryId', field:'category_id'}})
  }

  SettlementCategory.modelName = "SettlementCategory"

  return SettlementCategory
}
