require('dotenv').config();

const Koa = require('koa');
const Router = require('koa-router');
const cors = require('@koa/cors');
const send = require('koa-send');
const static = require('koa-static');
const bodyParser = require('koa-bodyparser');
const api = require('./api');
//const s3 = require('./s3');
const local = require('./localUploader');
const jwtMiddleware = require('./lib/jwtMiddleware');


const app = new Koa();
const router = new Router();
const port = process.env.PORT || 4000;

router.use('/api', api.routes());

app.use(static(__dirname + '/../build'));
app.use(bodyParser());
app.use(cors());
app.use(jwtMiddleware);
app.use(router.routes()).use(router.allowedMethods());

app.use(async (ctx) => {
    await send(ctx, ctx.path, { root: __dirname + '/../build/index.html' });
});

app.listen(port, () => { console.log(`Koa server is listening to port ${port}`); });

  router.post('/upload/single', local.upload.single('img'), async (ctx, next) => {
    
    const IMG_URL = `http://${process.env.DOMAIN}:4000/uploads/${ctx.file.filename}`
    
    ctx.body = {url: IMG_URL};
  });

/*
router.post('/upload/single', s3.upload.single('img'), (ctx, next) => {
    
    const IMG_URL = ctx.request.file.location;

    console.log(IMG_URL);
    ctx.body = {url: IMG_URL};
});
*/