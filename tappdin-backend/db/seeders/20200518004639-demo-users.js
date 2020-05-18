'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

   return queryInterface.bulkInsert('Users', [
     {
      email:'ben@perlmutter.io',
      username: 'ben',
      hashedPassword: '1234',
      firstName: 'Ben',
      lastName: 'Perlmutter',
      createdAt: new Date(),
      updatedAt: new Date(),
     },
     {
       email: 'giancarlo@sanchez.io',
       username: 'giancarlo',
       hashedPassword: '1234',
       firstName: 'Giancarlo',
       lastName: 'Sanchez',
       createdAt: new Date(),
       updatedAt: new Date(),
     },
     {
       email: 'johnny@bui.io',
       username: 'johnny',
       hashedPassword: '1234',
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
