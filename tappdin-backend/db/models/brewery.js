'use strict';
module.exports = (sequelize, DataTypes) => {
  const Brewery = sequelize.define('Brewery', {
    name: DataTypes.STRING,
    location: DataTypes.STRING,
    description: DataTypes.TEXT,
    facebook: DataTypes.STRING,
    instagram: DataTypes.STRING,
    twitter: DataTypes.STRING,
    image: DataTypes.STRING
  }, {});
  Brewery.associate = function(models) {
    // associations can be defined here
  };
  return Brewery;
};