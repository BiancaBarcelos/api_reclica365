'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('pontos_categorias_reciclaveis', {
      ponto_coleta_id: {
        type: Sequelize.INTEGER,
        references: { 
          model: 'pontos_coleta', 
          key: 'id' 
        },
        allowNull: false,
        onUpdate: 'CASCADE', // caso haja edicao no ponto_coleta_id, altera registros associados a ela na tabela intermediária automaticamente.
        onDelete: 'CASCADE', // caso haja exclusao do ponto_coleta_id, remove registros associados a ele na tabela intermediária automaticamente. 
        primaryKey: true,
      },
      id_material: {
        type: Sequelize.INTEGER,
        references: { 
          model: 'categorias_reciclaveis', 
          key: 'id' 
        },
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        primaryKey: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('pontos_categorias_reciclaveis');
  }
};
