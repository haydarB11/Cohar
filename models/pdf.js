'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pdf extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Level, {
        foreignKey: 'level_id',
        as: 'level'
      });
      this.hasMany(models.OrderLecture, {
        foreignKey: 'pdf_id',
        as: 'order_lectures'
      });
    }
  }
  Pdf.init({
    url: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    underscored: true,
    tableName: 'pdfs',
    modelName: 'Pdf',
  });
  return Pdf;
};