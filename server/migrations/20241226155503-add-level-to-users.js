"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Users", "level", {
      type: Sequelize.STRING, // Hak akses (enum)
      allowNull: false,
      defaultValue: "admin", // Default level adalah 'user'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Users", "level");
  },
};
