const db = require('../lib');
const { DataTypes, NOW } = require('sequelize');

const Post = db.define(
'Post', 
{
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    body: {
        type:DataTypes.STRING
    },
    publishedDate: {
        type: DataTypes.DATE,
        defaultValue: NOW
    }
}, 
{

});

(async() => {
    await db.sync({ alter: true});
})();
console.log("The Table for the Post model was just (re)created!");

module.exports = Post;