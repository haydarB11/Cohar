'use strict';
const {user_type, year, gender} = require('./enum.json');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    
    generateToken(){
      const token = jwt.sign({ id: this.id, user : this.user }, process.env.SECRETKEY);
      return token;
    }
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Code, {
        foreignKey: 'user_id',
        as: 'codes'
      });
      this.hasMany(models.StudentPin, {
        foreignKey: 'user_id',
        as: 'student_pins'
      });
      this.hasMany(models.QuizStudent, {
        foreignKey: 'user_id',
        as: 'quiz_students'
      });
      this.hasMany(models.Chat, {
        foreignKey: 'sender_id',
        as: 'sent_chats'
      });
      this.hasMany(models.Chat, {
        foreignKey: 'receiver_id',
        as: 'received_chats'
      });
      this.hasMany(models.Message, {
        foreignKey: 'sender_id',
        as: 'sent_messages'
      });
      this.hasMany(models.Message, {
        foreignKey: 'receiver_id',
        as: 'received_messages'
      });
      this.hasMany(models.Course, {
        foreignKey: 'manager_id',
        as: 'courses'
      });
      this.hasMany(models.OrderLecture, {
        foreignKey: 'user_id',
        as: 'order_lectures'
      });
      this.hasMany(models.Comment, {
        foreignKey: 'user_id',
        as: 'comments'
      });
    }
  }
  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    user: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: "user already used",
      }
    },
    loggedIn: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    // number_of_illegal_attempts: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    //   defaultValue: 0,
    // },
    // mac_address: {
    //   type: DataTypes.STRING,
    //   allowNull: true,
    //   unique: true,
    // },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: "phone number already used"
      }
    },
    type: {
      type: DataTypes.ENUM,
      values: user_type,
      defaultValue: 'user',
      allowNull: false,
    },
    // cardId: {
    //   type: DataTypes.STRING,
    //   allowNull: true,
    // },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "password cannot be empty",
        },
        len: {
          args: [8, 80],
          msg: "password must at least 8 characters",
        },
      },
    },
    // year: {
    //   type: DataTypes.ENUM,
    //   values: year,
    //   allowNull: true,
    // },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    gender: {
      type: DataTypes.ENUM,
      values: gender,
      allowNull: false,
    },
    // collage: {
    //   type: DataTypes.STRING,
    //   allowNull: true,
    // },
    token: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: null,
    }
  }, {
    sequelize,
    underscored: true,
    tableName: 'users',
    modelName: 'User',
  });
  return User;
};