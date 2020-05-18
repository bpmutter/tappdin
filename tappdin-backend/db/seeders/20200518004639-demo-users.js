'use strict';
const bcrypt = require('bcryptjs');



module.exports = {
  up: (queryInterface, Sequelize) => {

   return queryInterface.bulkInsert('Users', [
     {
      email:'ben@perlmutter.io',
      username: 'ben',
      hashedPassword: '$2a$10$fgwqZaa5nxKewvKag70FM.PrQzHqhtbWIHM5XXKGcffThOwfevZa.', //unhashed = 'abc123'
      firstName: 'Ben',
      lastName: 'Perlmutter',
      createdAt: new Date(),
      updatedAt: new Date(),
     },
     {
       email: 'giancarlo@sanchez.io',
       username: 'giancarlo',
       hashedPassword: '$2a$10$avZ..4Y7zqdc1E6Gi3fIC.miULFZY08sbKvkusd9HHZKTdD8XhaVm', //unhashed = 'abc123'
       firstName: 'Giancarlo',
       lastName: 'Sanchez',
       createdAt: new Date(),
       updatedAt: new Date(),
     },
     {
       email: 'johnny@bui.io',
       username: 'johnny',
       hashedPassword: '$2a$10$B1lGK5iOk0s5M77DVsATuuXBetRGInG.fp2uRZlQI/2x27GeFVs82', //unhashed = 'abc123'
       firstName: 'Johnny',
       lastName: 'Bui',
       createdAt: new Date(),
       updatedAt: new Date(),
     },
  ], {});
  },

  down: (queryInterface, Sequelize) => {

      return queryInterface.bulkDelete('Users', null, {});

  }
};
