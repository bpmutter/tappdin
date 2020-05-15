'use strict';
module.exports = (sequelize, DataTypes) => {
  const LikedBrewery = sequelize.define('LikedBrewery', {
    userId: DataTypes.INTEGER,
    breweryId: DataTypes.INTEGER
  }, {});
  LikedBrewery.associate = function(models) {
    // associations can be defined here
  };
  return LikedBrewery;
};