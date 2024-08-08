'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Code, {
        foreignKey: 'course_id',
        as: 'codes',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
      this.hasMany(models.Level, {
        foreignKey: 'course_id',
        as: 'levels'
      });
      this.hasMany(models.Quiz, {
        foreignKey: 'course_id',
        as: 'quiz'
      });
      this.hasMany(models.PreviousExam, {
        foreignKey: 'course_id',
        as: 'previous_exams'
      });
      this.hasMany(models.TimeLine, {
        foreignKey: 'course_id',
        as: 'timelines',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
      this.belongsTo(models.User, {
        foreignKey: 'manager_id',
        as: 'manager'
      });
      this.hasMany(models.Comment, {
        foreignKey: 'course_id',
        as: 'comments'
      });
      this.hasMany(models.StartingQuiz, {
        foreignKey: 'course_id',
        as: 'starting_quiz'
      });
    }
  }
  Course.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    photo: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
  }, {
    sequelize,
    underscored: true,
    tableName: 'courses',
    modelName: 'Course',
  });
  return Course;
};