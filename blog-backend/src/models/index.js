const db = require('./db');
const User = require('./user');
const Post = require('./post');
//const Like = require('./like');
/*
const Recipe = require('./recipe');
const Comment = require('./comment');
const Review = require('./review');
const Report = require('./report');
*/

Post.User = Post.belongsTo(User, { targetKey: 'username', foreignKey: 'username' });

/*
Like.Post = Post.belongsToMany(User, {
    through: 'Like',
    foreignKey: 'post_id'
});

Like.User = User.belongsToMany(Post, {
    through:'Like',
    foreignKey:'user_id'
});
*/

db.sync({force: false}).then(function () {
    console.log("db sync completed");
})

module.exports = { User, Post, /*Like*/ };