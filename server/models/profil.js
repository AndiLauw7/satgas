"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Profil extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Profil.init(
    {
      tittle_profil: DataTypes.STRING,
      content_profil: DataTypes.TEXT,
      image: DataTypes.STRING,
      tgl: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Profil",
    }
  );
  return Profil;
};
