'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ExerciseAnswer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.ExerciseQuestion, {
        foreignKey: 'exercise_question_id',
        as: 'exercise_question'
      });
    }
  }
  ExerciseAnswer.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    is_correct: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
    sequelize,
    underscored: true,
    tableName: 'exercise_answers',
    modelName: 'ExerciseAnswer',
  });
  return ExerciseAnswer;
};