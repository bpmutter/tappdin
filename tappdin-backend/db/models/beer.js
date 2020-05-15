'use strict';
module.exports = (sequelize, DataTypes) => {
  const Beer = sequelize.define('Beer', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    abv: DataTypes.FLOAT,
    ibu: DataTypes.INTEGER,
    beerTypeId: DataTypes.INTEGER,
    breweryId: DataTypes.INTEGER,
    image: DataTypes.STRING
  }, {});
  Beer.associate = function(models) {
    // associations can be defined here
  };
  return Beer;
};