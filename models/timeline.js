'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TimeLine extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Quiz, {
        foreignKey: 'quiz_id',
        as: 'quiz'
      });
      this.belongsTo(models.Level, {
        foreignKey: 'level_id',
        as: 'level'
      });
      this.belongsTo(models.Course, {
        foreignKey: 'course_id',
        as: 'course',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
      this.hasMany(models.StudentPin, {
        foreignKey: 'timeline_id',
        as: 'student_pins',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
      this.hasMany(models.DetermineLevel, {
        foreignKey: 'timeline_id',
        as: 'determine_levels',
        onDelete: 'CASCADE',
        onUpdate:'CASCADE',
      });
    }
  }
  TimeLine.init({
    order: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    available: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    sequelize,
    underscored: true,
    tableName: 'time_lines',
    modelName: 'TimeLine',
  });
  return TimeLine;
};