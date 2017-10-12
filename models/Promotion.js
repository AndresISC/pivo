const utils = require('../utils/ImageUtils.js')
module.exports = (sequelize, DataTypes) => {
  const Promotion = sequelize.define('promotion', {
    description: {
      type: DataTypes.TEXT,
    },
    image:{
      type: DataTypes.STRING,
    },
    startDate:{
      type: DataTypes.DATE,
      field:'start_date',
      allowNull: false
    },
    endDate:{
      type: DataTypes.DATE,
      field:'end_date',
      allowNull: false
    },
    imagePath: {
      type: new DataTypes.VIRTUAL(DataTypes.String, ['image']),
      get: function() { return utils.generateURL(this.image) }
    }
  },{
    underscored: true,
    tableName: 'promotion',
  })

  Promotion.beforeSave((promotion, options) => {
    if(options.files){
      var imageName = utils.generateImageName('promotion')
      promotion.image = imageName
    }
  })

  Promotion.afterSave((promotion, options) => {
    if (promotion.changed("image") && options.files){
      if (promotion.previous("image")){
        utils.deleteImage('promotions/' + promotion.previous("image"))
      }
      return utils.saveImageObj(options.files.image, promotion.image, 'promotions')
    }
  })

  Promotion.afterDestroy((promotion, options) => {
    if(promotion.image){
      return utils.deleteImage('promotions/' + promotion.image)
    }
  });

  Promotion.associate = function(models){
    Promotion.belongsTo(models.Settlement, {as:'Settlement', foreignKey: {name: 'settlementId', field:'settlement_id', allowNull: false}})
  }

  Promotion.modelName = "Promotion"

  return Promotion
}
