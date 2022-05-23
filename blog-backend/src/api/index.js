const Router = require('koa-router');
const posts = require('./post');
const auth = require('./auth');

const api = new Router();

api.use('/post', posts.routes());
api.use('/auth', auth.routes());

module.exports = api;