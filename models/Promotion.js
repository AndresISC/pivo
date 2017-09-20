
module.exports = (sequelize, DataTypes) => {
  const Promotion = sequelize.define('promotion', {
    description: {
      type: DataTypes.TEXT,
    },
    image_path:{
      type: DataTypes.STRING,
    },
    start_date:{
      type: DataTypes.DATE,
      allowNull: false
    },
    end_date:{
      type: DataTypes.DATE,
      allowNull: false
    }
  },{
    underscored: true,
    tableName: 'promotion',
  })

  Promotion.modelName = "Promotion"

  return Promotion
}
