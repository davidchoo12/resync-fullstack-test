const crypto = require('crypto');
const { DataTypes } = require('sequelize');

module.exports = sequelize => {
  const User = sequelize.define('user', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      get() {
        return () => this.getDataValue('password');
      }
    },
    salt: {
      type: DataTypes.STRING,
      get() {
        return () => this.getDataValue('salt');
      }
    }
  });
  // hash user password, src: https://medium.com/@benjaminpwagner/using-sequelize-hooks-and-crypto-to-encrypt-user-passwords-5cf1a27513d9
  User.generateSalt = () => {
    return crypto.randomBytes(16).toString('base64');
  };
  User.encryptPassword = (plainText, salt) => {
    return crypto
      .createHash('RSA-SHA256')
      .update(plainText)
      .update(salt)
      .digest('hex');
  };
  const setSaltAndPassword = user => {
    if (user.changed('password')) {
      user.salt = User.generateSalt();
      user.password = User.encryptPassword(user.password(), user.salt());
    }
  };
  User.beforeCreate(setSaltAndPassword);
  User.beforeUpdate(setSaltAndPassword);
  User.prototype.checkPassword = function (passwordInput) {
    return User.encryptPassword(passwordInput, this.salt()) === this.password();
  };
  return User;
};
