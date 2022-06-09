const db = require('./db');
const User = require('./user');
const Post = require('./post');
/*
const Recipe = require('./recipe');
const Comment = require('./comment');
const Review = require('./review');
const Report = require('./report');
*/

Post.User = Post.belongsTo(User, { 
    targetKey: 'id',
    foreignKey: 'user_id' 
});
Post.User = Post.belongsTo(User, { 
    targetKey: 'username',
    foreignKey: 'username' 
});

db.sync({force: false}).then(function () {
    console.log("db sync completed");
})

module.exports = { User, Post };