'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.bulkInsert('Checkins', [
        {userId: 1, beerId: 1, rating: 5, comment: 'yum so beer!!', createdAt: new Date(), updatedAt: new Date()},
        {userId: 2, beerId: 5, rating:3, comment: 'great for shotgunning', createdAt: new Date(), updatedAt: new Date()},
        {userId: 3, beerId: 23, rating: 1, comment: 'ewwwwwwwww!!', createdAt: new Date(), updatedAt: new Date()},
        {userId: 1, beerId: 30, rating: 5, comment: 'My fav!', createdAt: new Date(), updatedAt: new Date()},
        {userId: 2, beerId: 100, rating: 1, comment: 'It\'s too dry!!', createdAt: new Date(), updatedAt: new Date()},
        {userId: 3, beerId: 120, rating: 1, comment: 'It\'s too dry!!', createdAt: new Date(), updatedAt: new Date()},
        {userId: 1, beerId: 3, rating: 3, comment: 'It\'s okay...', createdAt: new Date(), updatedAt: new Date()},
        {userId: 2, beerId: 8, rating: 2, comment: 'It\'s too dense!!', createdAt: new Date(), updatedAt: new Date()},
        {userId: 3, beerId: 75, rating: 5, comment: 'I luv this beer', createdAt: new Date(), updatedAt: new Date()},
        {userId: 1, beerId: 125, rating: 2, comment: 'ewwwww!', createdAt: new Date(), updatedAt: new Date()},
        {userId: 2, beerId: 280, rating: 1, comment: 'Bad taste!!', createdAt: new Date(), updatedAt: new Date()},
        {userId: 3, beerId: 400, rating: 4, comment: 'Refreshing', createdAt: new Date(), updatedAt: new Date()},
        {userId: 1, beerId: 42, rating: 4, comment: 'My fav!', createdAt: new Date(), updatedAt: new Date()},
        {userId: 2, beerId: 57, rating: 3, comment: 'I like the smell', createdAt: new Date(), updatedAt: new Date()},
        {userId: 3, beerId: 77, rating: 2, comment: 'Super strong', createdAt: new Date(), updatedAt: new Date()},
    ], {});

  },

  down: (queryInterface, Sequelize) => {

      return queryInterface.bulkDelete('Checkins', null, {});

  }
};
