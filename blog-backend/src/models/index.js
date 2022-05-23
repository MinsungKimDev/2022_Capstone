const db = require('./db');
const User = require('./user');
const Post = require('./Post');

Post.User = Post.belongsTo(User, { targetKey: 'username', foreignKey: 'userName'});

db.sync({force: false}).then(function () {
    console.log("db sync completed");
})

module.exports = { User, Post };