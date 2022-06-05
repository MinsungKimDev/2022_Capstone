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
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    set(value) {
        this.setDataValue('password', bcrypt.hashSync(value, saltRounds));
    }
  },
  /*
  nickname:{
    type: DataTypes.STRING,
    allowNull:false
  },
  email:{
    type: DataTypes.STRING,
    allowNull:false
  },
  isAdmin:{
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  limitedDay: {
    type: DataTypes.DATE,
    defaultValue: null
  }
  */

}, {
  sequelize: db,
  modelName: 'User',
  charset: "utf8", // 한국어 설정
  collate: "utf8_general_ci", // 한국어 설정
  timestamps: false, // createAt & updateAt 활성화
});

(async () => {
  await User.sync({});
})();
console.log('The Table for the User model was just (re)created!');

module.exports = User;