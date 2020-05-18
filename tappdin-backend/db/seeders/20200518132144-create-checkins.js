'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.bulkInsert('Checkins', [
        {userId: 1, beerId: 1, rating: 5, comment: 'yum so beer!!', createdAt: new Date(), updatedAt: new Date()},
        {userId: 2, beerId: 5, rating:3, comment: 'great for shotgunning', createdAt: new Date(), updatedAt: new Date()},
        {userId: 3, beerId: 23, rating: 1, comment: 'ewwwwwwwww!!', createdAt: new Date(), updatedAt: new Date()},
    ], {});

  },

  down: (queryInterface, Sequelize) => {

      return queryInterface.bulkDelete('Checkins', null, {});

  }
};
