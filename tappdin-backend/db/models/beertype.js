'use strict';
module.exports = (sequelize, DataTypes) => {
  const BeerType = sequelize.define('BeerType', {
    typeOfBeer: DataTypes.STRING
  }, {});
  BeerType.associate = function(models) {
    // associations can be defined here
  };
  return BeerType;
};