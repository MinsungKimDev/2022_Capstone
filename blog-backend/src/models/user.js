const db = require('./db');
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
    unique: true,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    set(value) {
        this.setDataValue('password', bcrypt.hashSync(value, saltRounds));
    }
  },
  email: {
    type: DataTypes.STRING
  },
  level: {
    type: DataTypes.STRING
  },
  isAdmin: {
    type: DataTypes.BOOLEAN,
    defaultValues: 0
  },
  limitedDay: {
    type: DataTypes.DATE
  }
}, {
  sequelize: db,
  modelName: 'User',
  createdAt: false,
  updatedAt: false
});

(async () => {
  await User.sync({});
})();
console.log('The Table for the User model was just (re)created!');

module.exports = User;