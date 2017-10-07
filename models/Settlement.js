var utils = require('../utils/ImageUtils.js')

module.exports = (sequelize, DataTypes) => {
  //const SettlementType = sequelize.import('./SettlementType')
  //const Promotion = sequelize.import('./Promotion')
  //const Gallery = sequelize.import('./Gallery')
  //const User = sequelize.import('./User')

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

  Settlement.afterDestroy((settlement, options) => {
    if (settlement.image){
      return utils.deleteImage('settlements/' + settlement.image)
    }
  });

  Settlement.associate = function(models) {
    Settlement.belongsTo(models.SettlementType, { as: 'Type', foreignKey: 'settlement_type_id' })

    Settlement.hasMany(models.Promotion, {as:'Promotions', foreignKey: { field:'settlement_id', allowNull: false }, onDelete: 'cascade', hooks: true })
    Settlement.hasMany(models.Gallery, {as:'Photos', foreignKey: { field:'settlement_id', allowNull: false }, onDelete: 'cascade', hooks: true})

    Settlement.belongsToMany(models.User, { as: 'FavoritedBy', through: 'favorites', foreignKey: 'settlement_id' })
    Settlement.belongsToMany(models.User, { as: 'Vistors', through: 'history', foreignKey: 'settlement_id' })
    Settlement.belongsToMany(models.User, { as: 'CheckedInVisitors', through: 'checked_in', foreignKey: 'settlement_id' })
  }

  Settlement.modelName = "Settlement"

  return Settlement
}
