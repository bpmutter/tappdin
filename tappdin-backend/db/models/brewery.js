'use strict';
module.exports = (sequelize, DataTypes) => {
  const Brewery = sequelize.define('Brewery', {
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
      }
    },
    key: {
      type: DataTypes.STRING,
      unique: true,
      validate: {notEmpty: false}
    },
    location: DataTypes.STRING,
    description: DataTypes.TEXT,
    facebook: DataTypes.STRING,
    instagram: DataTypes.STRING,
    twitter: DataTypes.STRING,
    website: DataTypes.STRING,
    image: DataTypes.STRING
  }, {});
  Brewery.associate = function(models) {
    // associations can be defined here
    Brewery.hasMany(models.Beer, {foreignKey: "breweryId"})
    const usersColumnMapping = {
      through: "LikedBrewery",
      otherKey: "userId",
      foreignKey: "breweryId"
    };
    Brewery.belongsToMany(models.User, usersColumnMapping);
  };
  return Brewery;
};
