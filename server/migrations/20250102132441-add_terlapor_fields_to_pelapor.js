"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Pelapors", "nama_terlapor", {
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn("Pelapors", "no_hp_terlapor", {
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn("Pelapors", "status_terlapor", {
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn("Pelapors", "created_by", {
      type: Sequelize.INTEGER,
      allowNull: true, // Bisa null jika anonim
      references: {
        model: "Users",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Pelapors", "nama_terlapor");
    await queryInterface.removeColumn("Pelapors", "no_hp_terlapor");
    await queryInterface.removeColumn("Pelapors", "status_terlapor");
    await queryInterface.removeColumn("Pelapors", "created_by");
  },
};
