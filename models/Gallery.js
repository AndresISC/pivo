const utils = require('../utils/ImageUtils.js')

module.exports = (sequelize, DataTypes) => {

  const Gallery = sequelize.define('gallery', {
    image:{
      type: DataTypes.STRING,
    },
    imagePath: {
      type: new DataTypes.VIRTUAL(DataTypes.String, ['image']),
      get: function() { return utils.generateURL(this.image) }
    }
  },{
    underscored: true,
    tableName: 'gallery',
  })

  Gallery.afterDestroy((gallery, options) => {
    if (gallery.image){
      return utils.deleteImage('gallery/' + gallery.image)
    }
  });

  Gallery.associate = function(models){
    Gallery.belongsTo(models.Settlement, {as:'Settlement', foreignKey: 'settlement_id'})
  }

  Gallery.modelName = "Gallery"

  return Gallery
}
