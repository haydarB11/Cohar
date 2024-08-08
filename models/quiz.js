'use strict';
const {model} = require('./enum.json');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Quiz extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      
      this.hasMany(models.QuizStudent, {
        foreignKey: 'quiz_id',
        as: 'quiz_students'
      });
      this.hasMany(models.TimeLine, {
        foreignKey: 'quiz_id',
        as: 'time_lines'
      });
      this.hasMany(models.Question, {
        foreignKey: 'quiz_id',
        as: 'questions'
      });
      this.belongsTo(models.Course, {
        foreignKey: 'course_id',
        as: 'course'
      });
    }
  }
  Quiz.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // number_of_question: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false
    // },
    success_mark: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    full_mark: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    // model: {
    //   type: DataTypes.ENUM,
    //   values: model,
    //   allowNull: false
    // },
  }, {
    sequelize,
    underscored: true,
    tableName: 'quizes',
    modelName: 'Quiz',
  });
  return Quiz;
};