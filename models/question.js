'use strict';
const {question_type, model, url_type} = require('./enum.json');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Question extends Model {
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
      this.belongsTo(models.StartingQuiz, {
        foreignKey: 'starting_quiz_id',
        as: 'starting_quiz'
      });
      this.hasMany(models.Answer, {
        foreignKey: 'question_id',
        as: 'answers'
      });
      this.hasMany(models.ExerciseQuestion, {
        foreignKey: 'question_id',
        as: 'exercise_questions'
      });
    }
  }
  Question.init({
    url: {
      type: DataTypes.STRING,
      allowNull: false
    },
    error_note: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false
    },
    mark: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    url_type: {
      type: DataTypes.ENUM,
      values: url_type,
      allowNull: false
    },
    type: {
      type: DataTypes.ENUM,
      values: question_type,
      allowNull: false,
      defaultValue: "question"
    },
    model: {
      type: DataTypes.ENUM,
      values: model,
      allowNull: false,
      defaultValue: "A"
    },
  }, {
    sequelize,
    underscored: true,
    tableName: 'questions',
    modelName: 'Question',
  });
  return Question;
};