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
    },
    settlementId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'settlement_id'
    }
  },{
    underscored: true,
    tableName: 'promotion',
  })

  Promotion.afterDestroy((promotion, options) => {
    if(promotion.image){
      return utils.deleteImage('promotions/' + promotion.image)
    }
  });

  Promotion.modelName = "Promotion"

  return Promotion
}
