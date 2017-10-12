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

  Gallery.beforeSave((gallery, options) => {
    if(options.files){
      var imageName = utils.generateImageName('gallery')
      gallery.image = imageName
    }
  })

  Gallery.afterSave((gallery, options) => {
    if (gallery.changed("image") && options.files){
      if (gallery.previous("image")){
        utils.deleteImage('gallery/' + gallery.previous("image"))
      }
      return utils.saveImageObj(options.files.image, gallery.image, 'gallery')
    }
  })

  Gallery.afterDestroy((gallery, options) => {
    if (gallery.image){
      return utils.deleteImage('gallery/' + gallery.image)
    }
  });

  Gallery.associate = function(models){
    Gallery.belongsTo(models.Settlement, {as:'Settlement', foreignKey: {name: 'settlementId', field:'settlement_id', allowNull: false}})
  }

  Gallery.modelName = "Gallery"

  return Gallery
}
