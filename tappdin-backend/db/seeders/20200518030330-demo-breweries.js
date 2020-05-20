
'use strict';
const seeder = require("../../generate-seed/brewery-seed2");
//const [...value] = seeder;
//console.log(seeder);


module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Breweries', seeder , {});
  },

  down: (queryInterface, Sequelize) => {

      return queryInterface.bulkDelete('Breweries', null, {});

  }
};
