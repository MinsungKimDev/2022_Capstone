const db = require('./db');
const { DataTypes, NOW } = require('sequelize');

const Post = db.define(
'Post', 
{
    
    id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        unique: true,
        autoIncrement: false,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    body: {
        type: DataTypes.TEXT
    },
    rate: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0
    },
    view: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0
    },
    level: {
        type: DataTypes.TINYINT
    },
}, 
{
    charset: "utf8", // 한국어 설정
    collate: "utf8_general_ci", // 한국어 설정
    timestamps: true, // createAt & updateAt 활성화
});

(async() => {
    await db.sync({ alter: true});
})();
console.log("The Table for the Post model was just (re)created!");

module.exports = Post;