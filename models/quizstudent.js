'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class QuizStudent extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      
      this.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user'
      });
      this.belongsTo(models.Quiz, {
        foreignKey: 'quiz_id',
        as: 'quiz'
      });
      this.belongsTo(models.StartingQuiz, {
        foreignKey: 'starting_quiz_id',
        as: 'starting_quiz'
      });
    }
  }
  QuizStudent.init({
    mark: {
      type: DataTypes.DOUBLE,
      allowNull: false
    }
  }, {
    sequelize,
    underscored: true,
    tableName: 'quiz_students',
    modelName: 'QuizStudent',
  });
  return QuizStudent;
};