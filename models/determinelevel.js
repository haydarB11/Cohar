'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DetermineLevel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.TimeLine, {
        foreignKey: 'timeline_id',
        as: 'timeline',
        onDelete: 'CASCADE',
        onUpdate:'CASCADE',
      });
      this.belongsTo(models.StartingQuiz, {
        foreignKey: 'starting_quiz_id',
        as: 'starting_quiz',
        onDelete: 'CASCADE',
        onUpdate:'CASCADE',
      });
    }
  }
  DetermineLevel.init({
    percentage: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
  }, {
    sequelize,
    underscored: true,
    tableName: 'determine_levels',
    modelName: 'DetermineLevel',
  });
  return DetermineLevel;
};