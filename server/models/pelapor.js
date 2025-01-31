"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Pelapor extends Model {
    static associate(models) {
      Pelapor.belongsTo(models.Users, {
        foreignKey: "created_by",
        as: "creator",
      });
      Pelapor.hasMany(models.tindak_lanjut, {
        foreignKey: "pelapor_id",
        as: "tindak_lanjuts", // Alias untuk relasi
      });
    }
  }
  Pelapor.init(
    {
      nama_pelapor: DataTypes.STRING,
      jenis_identitas: DataTypes.STRING,
      no_identitas: DataTypes.INTEGER,
      file_identitas: DataTypes.STRING,
      alamat_pelapor: DataTypes.STRING,
      no_hp_pelapor: DataTypes.STRING,
      email: DataTypes.STRING,
      unit_kerja: DataTypes.STRING,
      kategori_pelapor: DataTypes.STRING,
      status_pelapor: DataTypes.STRING,
      tgl_peristiwa: DataTypes.DATE,
      lokasi_peristiwa: DataTypes.STRING,
      kronologi_peristiwa: DataTypes.TEXT,
      bukti_peristiwa: DataTypes.STRING,
      nama_terlapor: DataTypes.STRING,
      no_hp_terlapor: DataTypes.STRING,
      status_terlapor: DataTypes.STRING,
      userAnonim: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      created_by: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Pelapor",
      // tableName: "tb_pelapor",
      timestamps: false,
    }
  );
  return Pelapor;
};
