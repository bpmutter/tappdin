'use strict';
module.exports = (sequelize, DataTypes) => {
  const LikedBrewery = sequelize.define('LikedBrewery', {
    userId: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: true,
      }
    },
    breweryId: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: true,
      }
    }
  }, {});
  LikedBrewery.associate = function(models) {
    // associations can be defined here
  };
  return LikedBrewery;
};