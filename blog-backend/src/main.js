require('dotenv').config();

const static = require('koa-static');
const send = require('koa-send');
const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const api = require('./api');
const jwtMiddleware = require('./lib/jwtMiddleware');

const app = new Koa();
const router = new Router();
const port = process.env.SERVER_PORT || 4000;

router.use('/api', api.routes());

app.use(static(__dirname + '/../build'));
app.use(bodyParser());
app.use(jwtMiddleware);
app.use(router.routes()).use(router.allowedMethods());

app.use(async (ctx) => {
    await send(ctx, ctx.path, { root: __dirname + '/../build/index.html' });
});

app.listen(4000, () => { console.log(`Koa server is listening to port ${port}`); });