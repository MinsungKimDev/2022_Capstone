require('dotenv').config();

const static = require('koa-static');
const send = require('koa-send');
const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const api = require('./api');
const jwtMiddleware = require('./lib/jwtMiddleware');
const s3 = require('./s3');

const app = new Koa();
const router = new Router();
const port = process.env.PORT || 4000;

router.use('/api', api.routes());

app.use(static(__dirname + '/../build'));
app.use(bodyParser());
app.use(jwtMiddleware);
app.use(router.routes()).use(router.allowedMethods());

app.use(async (ctx) => {
    await send(ctx, ctx.path, { root: __dirname + '/../build/index.html' });
});

app.listen(port, () => { console.log(`Koa server is listening to port ${port}`); });

router.post('/upload/single', s3.upload.single('file'), ctx => {
    body = ctx.req.file;
});
router.post('/upload/array', s3.upload.array('file'), ctx => {
    body = ctx.req.file;
});
router.post('/upload/any', s3.upload.any('file'), ctx => {
    body = ctx.req.file;
});