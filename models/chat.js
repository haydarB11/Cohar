'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Chat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // this.hasMany(models.Message, {
      //   foreignKey: 'chat_id',
      //   as: 'messages',
      //   onDelete: 'CASCADE',
      //   onUpdate: 'CASCADE'
      // });
      // this.belongsTo(models.User, {
      //   foreignKey: 'sender_id',
      //   as: 'sender'
      // });
      // this.belongsTo(models.User, {
      //   foreignKey: 'receiver_id',
      //   as: 'receiver'
      // });
    }
  }
  Chat.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    }
  }, {
    sequelize,
    underscored: true,
    tableName: 'chats',
    modelName: 'Chat',
  });
  return Chat;
};