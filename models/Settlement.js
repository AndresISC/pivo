
module.exports = (sequelize, DataTypes) => {
  const SettlementType = sequelize.import('./SettlementType')
  const Promotion = sequelize.import('./Promotion')
  const SettlementGallery = sequelize.import('./SettlementGallery')
  const User = sequelize.import('./User')

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
    facebook_url: {
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
    }
  },{
    underscored: true,
    tableName: 'settlement',
  })

  //Specify the relations of this model with other models
  Settlement.belongsTo(SettlementType, { as: 'Type', foreignKey: 'settlement_type_id' })
  SettlementType.hasMany(Settlement, {as: 'Settlements', foreignKey: 'settlement_type_id'})

  Settlement.hasMany(Promotion, {as:'Promotions', foreignKey: 'settlement_id'})

  Settlement.hasMany(SettlementGallery, {as:'Photos'})

  Settlement.belongsToMany(User, { as: 'Vistors', through: 'history', foreignKey: 'settlement_id' })
  User.belongsToMany(Settlement, { as: 'Visited', through: 'history', foreignKey: 'user_id' })

  Settlement.belongsToMany(User, { as: 'CheckedInVisitors', through: 'checked_in', foreignKey: 'settlement_id' })
  User.belongsToMany(Settlement, { as: 'CheckedIn', through: 'checked_in', foreignKey: 'user_id' })

  Settlement.belongsToMany(User, { as: 'FavoritedBy', through: 'favorites', foreignKey: 'settlement_id' })
  User.belongsToMany(Settlement, { as: 'Favorites', through: 'favorites', foreignKey: 'user_id' })

  Settlement.modelName = "Settlement"

  return Settlement
}
