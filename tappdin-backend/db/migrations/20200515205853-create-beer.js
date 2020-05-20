'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Beers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        // unique: true
      },
      key: {
        type: Sequelize.STRING,
          allowNull: false,
          unique: true
      },
      description: {
        type: Sequelize.TEXT
      },
      abv: {
        type: Sequelize.FLOAT
      },
      ibu: {
        type: Sequelize.INTEGER
      },
      beerTypeId: {
        type: Sequelize.INTEGER,
        references: {
          model: "BeerTypes",
          key: "id",
        },
      },
      breweryId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Breweries",
          key: "id",
        },
      },
      image: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Beers');
  }
};
