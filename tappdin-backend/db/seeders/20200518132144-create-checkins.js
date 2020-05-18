'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.bulkInsert('Checkins', [
        {
        name: 'John Doe',
        isBetaMember: false
      }
    ], {});

  },

  down: (queryInterface, Sequelize) => {

      return queryInterface.bulkDelete('Checkins', null, {});

  }
};
