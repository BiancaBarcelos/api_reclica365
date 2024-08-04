'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('usuarios', [{
      nome: 'Ton Kulmann',
      sexo: 'masculino',
      cpf: '12345678903',
      senha: '$2a$10$E.jnGgn32IYhkX2jsGZ00OHZbgT4jQJ./ffUbDfyjF5QcxdNh4Zou',
      email: 'ton.kulmann@email.com',
      data_de_nascimento: '1991-04-29',
      logradouro: 'Rua Blabla',
      numero: 123,
      complemento: 'Apto 201',
      bairro: 'rio tavares',
      cidade: 'Florianópolis',
      estado: 'SC',
      cep: '80000001',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      nome: 'Kalel Kulmann',
      sexo: 'masculino',
      cpf: '12345678901',
      senha: '$2a$10$E.jnGgn32IYhkX2jsGZ00OHZbgT4jQJ./ffUbDfyjF5QcxdNh4Zou',
      email: 'kalel.kulmann@email.com',
      data_de_nascimento: '2019-12-24',
      logradouro: 'Rua Blabla',
      numero: 123,
      complemento: 'Apto 201',
      bairro: 'rio tavares',
      cidade: 'Florianópolis',
      estado: 'SC',
      cep: '80000001',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      nome: 'Bia Silva',
      sexo: 'feminino',
      cpf: '12345678902',
      senha: '$2a$10$E.jnGgn32IYhkX2jsGZ00OHZbgT4jQJ./ffUbDfyjF5QcxdNh4Zou',
      email: 'bia.silva@email.com',
      data_de_nascimento: '1997-12-25',
      logradouro: 'Rua Blabla',
      numero: 123,
      complemento: '',
      bairro: 'teste',
      cidade: 'Florianópolis',
      estado: 'SC',
      cep: '88000000',
      createdAt: new Date(),
      updatedAt: new Date()
    }
    ], {});
  },

  async down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete('usuarios', null, {});
}
};
