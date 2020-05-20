'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      email: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
          notEmpty: true,
          isEmail: true,
        },
      },
      username: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
          notEmpty: true,
        },
      },
      hashedPassword: {
        type: DataTypes.STRING.BINARY,
        validate: {
          notEmpty: true,
        },
      },
      photo: DataTypes.STRING,
      firstName: {
        type: DataTypes.STRING.BINARY,
        validate: {
          notEmpty: true,
        },
      },
      lastName: {
        type: DataTypes.STRING.BINARY,
        validate: {
          notEmpty: true,
        },
      },
      aboutYou: DataTypes.TEXT,
    },
    {}
  );
  User.associate = function(models) {
    const beersColumnMapping = {
      through: "Checkin",
      otherKey: 'beerId',
      foreignKey: 'userId'
    }
    User.belongsToMany(models.Beer, beersColumnMapping);
    User.hasMany(models.List, {foreignKey:"userId"});
    User.hasMany(models.Checkin, {foreignKey: "userId"});
    const breweriesColumnMapping = {
      through: "LikedBrewery",
      otherKey: 'breweryId',
      foreignKey: 'userId'
    }
    User.belongsToMany(models.Brewery, breweriesColumnMapping);
    const listsColumnMapping = {
      through: "List",
      otherKey: 'beerId',
      foreignKey: 'userId'
    };
    User.belongsToMany(models.Beer, listsColumnMapping )
  };
  return User;
};