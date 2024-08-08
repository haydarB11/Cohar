'use strict';
const {url_type} = require('./enum.json');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ExerciseQuestion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Question, {
        foreignKey: 'question_id',
        as: 'question'
      });
      this.hasMany(models.ExerciseAnswer, {
        foreignKey: 'exercise_question_id',
        as: 'exercise_answers'
      });
    }
  }
  ExerciseQuestion.init({
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
  }, {
    sequelize,
    underscored: true,
    tableName: 'exercise_questions',
    modelName: 'ExerciseQuestion',
  });
  return ExerciseQuestion;
};