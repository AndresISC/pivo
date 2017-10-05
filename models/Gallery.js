module.exports = (sequelize, DataTypes) => {

  const Gallery = sequelize.define('gallery', {
    imagePath: {
      type: DataTypes.STRING,
      field: 'image_path'
    }
  },{
    underscored: true,
    tableName: 'gallery',
  })

  Gallery.modelName = "Gallery"

  return Gallery
}
