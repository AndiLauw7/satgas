"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class tindak_lanjut extends Model {
    static associate(models) {
      tindak_lanjut.belongsTo(models.Pelapor, {
        foreignKey: "pelapor_id",
        as: "pelapor",
      });
    }
  }
  tindak_lanjut.init(
    {
      // status_laporan: DataTypes.STRING,
      status_laporan: {
        type: DataTypes.ENUM("Diterima", "Ditolak", "Diproses", "Selesai"),
        allowNull: false,
        defaultValue: "Diterima",
      },
      tgl: DataTypes.DATE,
      keterangan: DataTypes.STRING,
      pelapor_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "tindak_lanjut",
      tableName: "tindak_lanjuts",
    }
  );
  return tindak_lanjut;
};
