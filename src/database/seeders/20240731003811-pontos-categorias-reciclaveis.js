'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('pontos_categorias_reciclaveis', [
      {
        ponto_coleta_id: 4,
        id_material: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        ponto_coleta_id: 3,
        id_material: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        ponto_coleta_id: 4,
        id_material: 8,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  }
}