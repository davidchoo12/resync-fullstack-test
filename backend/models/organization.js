const { DataTypes } = require('sequelize');

module.exports = sequelize => {
  sequelize.define('organization', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    owner: {
      type: DataTypes.STRING,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    state: {
      type: DataTypes.STRING
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
};
