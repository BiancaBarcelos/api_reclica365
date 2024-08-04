'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('pontos_coleta', [
      {
        usuario_id:5,
        nome:'Ponto de coleta das laranjeiras',
        descricao:'',
        logradouro:'rua das laranjeiras',
        numero:50,
        complemento:'',
        bairro:'rio tavares',
        cidade:'Florianópolis',
        estado:'SC',
        cep:'88560123',
        latitude:3000.00,
        longitude:20000.00,
        url_google_maps:'https://www.google.com.br/maps/',
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        usuario_id:7,
        nome:'Ponto das Perobas',
        descricao:'',
        logradouro:'rua das Perobas',
        numero:112,
        complemento:'rua sem saida',
        bairro:'Madri',
        cidade:'Palhoça',
        estado:'SC',
        cep:'88000123',
        latitude:3000.00,
        longitude:20000.00,
        url_google_maps:'https://www.google.com.br/maps/',
        createdAt:new Date(),
        updatedAt:new Date()
      }
    ])
  }
}