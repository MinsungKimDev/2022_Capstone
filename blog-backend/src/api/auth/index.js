const Router = require('koa-router');
const authCtrl = require('./auth.ctrl');

const auth = new Router();

auth.post('/register', authCtrl.register);
auth.post('/login', authCtrl.login);
auth.get('/check', authCtrl.check); //check 는 로그인상태 확인용
auth.post('/logout', authCtrl.logout);

module.exports = auth;