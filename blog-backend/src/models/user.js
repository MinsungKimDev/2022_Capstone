const db = require('../lib');
const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;

class User extends Model {
  validPassword(password) {
    return bcrypt.compareSync(password, this.password);
  }
  generateToken() {
    const token = jwt.sign(
      {
        _id: this.id,
        username: this.username, 
      },
      process.env.JWT_SECRET,
      {
        expiresIn:'7d',
      },
    );

    return token;
  }
}


User.init({
  username: {
    type: DataTypes.STRING,
  },
  password: {
    type: DataTypes.STRING,
    set(value) {
        this.setDataValue('password', bcrypt.hashSync(value, saltRounds));
    }
  }
}, {
  sequelize: db,
  modelName: 'User'
});

(async () => {
  await User.sync({});
})();
console.log('The table for the User model was just (re)created!');

module.exports = User;