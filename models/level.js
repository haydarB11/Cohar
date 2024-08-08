'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Level extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Course, {
        foreignKey: 'course_id',
        as: 'course'
      });
      this.hasMany(models.TimeLine, {
        foreignKey: 'level_id',
        as: 'time_lines'
      });
      this.hasMany(models.Pdf, {
        foreignKey: 'level_id',
        as: 'pdfs'
      });
      this.hasMany(models.Video, {
        foreignKey: 'level_id',
        as: 'videos'
      });
    }
  }
  Level.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    underscored: true,
    tableName: 'levels',
    modelName: 'Level',
  });
  return Level;
};