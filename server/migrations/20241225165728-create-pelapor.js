'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Pelapors', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nama_pelapor: {
        type: Sequelize.STRING
      },
      jenis_identitas: {
        type: Sequelize.STRING
      },
      no_identitas: {
        type: Sequelize.INTEGER
      },
      file_identitas: {
        type: Sequelize.STRING
      },
      alamat_pelapor: {
        type: Sequelize.STRING
      },
      no_hp_pelapor: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      unit_kerja: {
        type: Sequelize.STRING
      },
      kategori_pelapor: {
        type: Sequelize.STRING
      },
      status_pelapor: {
        type: Sequelize.STRING
      },
      tgl_peristiwa: {
        type: Sequelize.DATE
      },
      lokasi_peristiwa: {
        type: Sequelize.STRING
      },
      kronologi_peristiwa: {
        type: Sequelize.TEXT
      },
      bukti_peristiwa: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Pelapors');
  }
};