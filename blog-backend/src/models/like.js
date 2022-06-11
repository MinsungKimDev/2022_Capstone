const db = require('./db');
const { DataTypes, NOW } = require('sequelize');

const Like = db.define(
'Like',
{
    like_id :{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    }
},
{
    charset: "utf8",
    collate: "utf8_general_ci",
    timestamps: false,
    freezeTableName: true
});

(async() => {
    await db.sync({ alter: true});
})()
console.log("The Table for the Like model was just (re)created!");

module.exports = Like;