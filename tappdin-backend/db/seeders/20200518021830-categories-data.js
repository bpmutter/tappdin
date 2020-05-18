'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
      return queryInterface.bulkInsert('BeerTypes', [
        {
                    typeOfBeer: "British Origin Ales",
                    createdAt: new Date(),
                    updatedAt: new Date()
        }, {
                    typeOfBeer: "Irish Origin Ales",
                    createdAt: new Date(),
                    updatedAt: new Date()
        }, {
                    typeOfBeer: "North American Origin Ales",
                    createdAt: new Date(),
                    updatedAt: new Date()
        }, {
                    typeOfBeer: "German Origin Ales",
                    createdAt: new Date(),
                    updatedAt: new Date()
        }, {
                    typeOfBeer: "Belgian And French Origin Ales",
                    createdAt: new Date(),
                    updatedAt: new Date()
        }, {
                    typeOfBeer: "International Ale Styles",
                    createdAt: new Date(),
                    updatedAt: new Date()
        }, {
          typeOfBeer: "European-germanic Lager",
          createdAt: new Date(),
          updatedAt: new Date()
        }, {
          typeOfBeer: "North American Lager",
          createdAt: new Date(),
          updatedAt: new Date()
        }, {
          typeOfBeer: "Other Lager",
          createdAt: new Date(),
          updatedAt: new Date()
        }, {
          
          typeOfBeer: "International Styles",
          createdAt: new Date(),
          updatedAt: new Date()
        }, {
          
          typeOfBeer: "Hybrid/mixed Beer",
          createdAt: new Date(),
          updatedAt: new Date()
        }, {
          
          typeOfBeer: "Mead, Cider, & Perry",
          createdAt: new Date(),
          updatedAt: new Date()
        }, {
          
          typeOfBeer: "Other Origin",
          createdAt: new Date(),
          updatedAt: new Date()
        }, {
          
          typeOfBeer: "Malternative Beverages",
          createdAt: new Date(),
          updatedAt: new Date()
        }
    ], {});
 
  },

  down: (queryInterface, Sequelize) => {
   
      return queryInterface.bulkDelete('BeerTypes', null, {});

  }
};
