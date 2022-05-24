const Router = require('koa-router');
const postsCtrl = require('./posts.ctrl');
const checkLoggedIn = require('../../lib/checkLoggedIn');

const posts = new Router();

posts.get('/', postsCtrl.list);
posts.post('/', checkLoggedIn, postsCtrl.write); // 로그인해야 글 작성 가능 


const post = new Router(); //api/posts/:id

post.get('/', postsCtrl.read);
post.delete('/', checkLoggedIn, postsCtrl.checkOwnPost, postsCtrl.remove);
post.patch('/', checkLoggedIn, postsCtrl.checkOwnPost, postsCtrl.update);

posts.use('/:id', postsCtrl.getPostById, post.routes());

module.exports = posts;