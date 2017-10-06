const utils = require('../utils/ImageUtils.js')

module.exports = (sequelize, DataTypes) => {

  const Gallery = sequelize.define('gallery', {
    image:{
      type: DataTypes.STRING,
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
    tableName: 'gallery',
  })

  Gallery.afterDestroy((gallery, options) => {
    return utils.deleteGalleryImage(gallery.image)
  });

  Gallery.modelName = "Gallery"

  return Gallery
}
