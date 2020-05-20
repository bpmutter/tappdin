'use strict';
const seeder = require("../../generate-seed/beer-seed");
// const [...value] = seeder;
console.log(seeder)
module.exports = {
  up: (queryInterface, Sequelize) => {

       return queryInterface.bulkInsert('Beers', seeder, {});

  },

  down: (queryInterface, Sequelize) => {

      return queryInterface.bulkDelete('Beers', null, {});

  }
};
