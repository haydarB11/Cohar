"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Video extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Level, {
        foreignKey: "level_id",
        as: "level",
      });
    }
  }
  Video.init(
    {
      url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      quality: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      underscored: true,
      tableName: "videos",
      modelName: "Video",
    }
  );
  return Video;
};
