var utils = require('../utils/ImageUtils.js')

module.exports = (sequelize, DataTypes) => {

  var Settlement = sequelize.define('settlement', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
    },
    email:{
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true,
        notEmpty: true
      }
    },
    url: {
      type: DataTypes.STRING,
      validate: { isUrl: true }
    },
    facebookUrl: {
      type: DataTypes.STRING,
      field: 'facebook_url',
      validate: { isUrl: true }
    },
    phone: {
      type: DataTypes.STRING,
    },
    latitude: {
      type: DataTypes.DECIMAL
    },
    longitude: {
      type: DataTypes.DECIMAL
    },
    image:{
      type: DataTypes.STRING
    },
    imagePath: {
      type: new DataTypes.VIRTUAL(DataTypes.String, ['image']),
      get: function() { return utils.generateURL(this.image) }
    }
  },{
    underscored: true,
    tableName: 'settlement',
  })

  Settlement.beforeSave((settlement, options) => {
    if(options.files){
      var imageName = utils.generateImageName('settlement')
      settlement.image = imageName
    }
  })

  Settlement.afterSave((settlement, options) => {
    if (settlement.changed("image") && options.files){
      if (settlement.previous("image")){
        utils.deleteImage('settlements/' + settlement.previous("image"))
      }
      return utils.saveImageObj(options.files.image, settlement.image, 'settlements')
    }
  })

  Settlement.afterDestroy((settlement, options) => {
    if (settlement.image){
      return utils.deleteImage('settlements/' + settlement.image)
    }
  });

  Settlement.associate = function(models) {
    Settlement.belongsTo(models.SettlementCategory, { as: 'Category', foreignKey: {name: 'categoryId', field:'category_id'}})
    Settlement.hasMany(models.Promotion, {as:'Promotions',
                                          foreignKey: {
                                                        name: 'settlementId',
                                                        field:'settlement_id',
                                                        allowNull: false
                                                      },
                                          onDelete: 'cascade',
                                          hooks: true })
    Settlement.hasMany(models.Gallery, {as:'Photos', foreignKey: {name: 'settlementId', field:'settlement_id', allowNull: false}, onDelete: 'cascade', hooks: true})

    Settlement.belongsToMany(models.User, { as: 'FavoritedBy', through: 'favorites', foreignKey: 'settlement_id' })
    Settlement.belongsToMany(models.User, { as: 'Vistors', through: 'history', foreignKey: 'settlement_id' })
    Settlement.belongsToMany(models.User, { as: 'CheckedInVisitors', through: 'checked_in', foreignKey: 'settlement_id' })
  }

  Settlement.modelName = "Settlement"

  return Settlement
}
