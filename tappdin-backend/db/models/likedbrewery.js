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
    LikedBrewery.belongsTo(models.User, {foreignKey: "userId"});
    LikedBrewery.belongsTo(models.Brewery, {foreignKey: "breweryId"});
  };
  return LikedBrewery;
};
