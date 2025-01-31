"use strict";

/** @type {import('sequelize-cli').Migration} */
const bcrypt = require("bcrypt");
module.exports = {
  async up(queryInterface, Sequelize) {
    const adminPassword = await bcrypt.hash("adminSatgasPPKS123", 10);
    const ketuaPassword = await bcrypt.hash("ketuaSatgasPPKS123", 10);
    return queryInterface.bulkInsert("users", [
      {
        username: "admin",
        password: adminPassword,
        level: "admin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "ketua",
        password: ketuaPassword,
        level: "ketua",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("users", null, {});
  },
};
