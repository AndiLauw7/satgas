"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("tindak_lanjuts", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      status_laporan: {
        type: Sequelize.STRING,
      },
      tgl: {
        type: Sequelize.DATE,
      },
      keterangan: {
        type: Sequelize.STRING,
      },
      pelapor_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Pelapors",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("tindak_lanjuts");
  },
};
