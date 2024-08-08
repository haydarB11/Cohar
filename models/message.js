'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // this.belongsTo(models.Chat, {
      //   foreignKey: 'chat_id',
      //   as: 'chat'
      // });
      this.belongsTo(models.User, {
        foreignKey: 'sender_id',
        as: 'sender'
      });
      this.belongsTo(models.User, {
        foreignKey: 'receiver_id',
        as: 'receiver'
      });
    }
  }
  Message.init({
    message: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    underscored: true,
    tableName: 'messages',
    modelName: 'Message',
  });
  return Message;
};