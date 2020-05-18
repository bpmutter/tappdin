'use strict';
module.exports = (sequelize, DataTypes) => {
  const BeerType = sequelize.define('BeerType', {
    typeOfBeer: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
      }
    }
  }, {});
  BeerType.associate = function(models) {
    // associations can be defined here
    BeerType.hasMany(models.Beer, {foreignKey: 'beerTypeId'});
  };
  return BeerType;
};