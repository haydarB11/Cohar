'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class StudentPin extends Model {
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
      this.belongsTo(models.TimeLine, {
        foreignKey: 'timeline_id',
        as: 'timeline',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    }
  }
  StudentPin.init({
    is_completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    },
    number_of_fails: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false
    },
    // stopped: {
    //   type: DataTypes.BOOLEAN,
    //   defaultValue: 0,
    //   allowNull: false
    // },
  }, {
    sequelize,
    underscored: true,
    tableName: 'student_pins',
    modelName: 'StudentPin',
  });
  return StudentPin;
};