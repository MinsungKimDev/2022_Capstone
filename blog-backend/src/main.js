require('dotenv').config();

const Koa = require('koa');
const Router = require('koa-router');
const cors = require('@koa/cors');
const send = require('koa-send');
const static = require('koa-static');
const bodyParser = require('koa-bodyparser');
const koaBody = require('koa-body');
const api = require('./api');
const s3 = require('./s3');
const jwtMiddleware = require('./lib/jwtMiddleware');


const app = new Koa();
const router = new Router();
const port = process.env.PORT || 4000;

router.use('/api', api.routes());

app.use(static(__dirname + '/../build'));
app.use(koaBody());
app.use(cors());
app.use(jwtMiddleware);
app.use(router.routes()).use(router.allowedMethods());

app.use(async (ctx) => {
    await send(ctx, ctx.path, { root: __dirname + '/../build/index.html' });
});

app.listen(port, () => { console.log(`Koa server is listening to port ${port}`); });

router.post('/upload/single', s3.upload.single('img'), (ctx, next) => {
    const { fieldname, originalname, encoding, mimetype, destination, filename, path, size } = ctx.request.file
    const { name } = ctx.request.body;

    /*
    console.log("body 데이터 : ", name);
    console.log("폼에 정의된 필드명 : ", fieldname);
    console.log("사용자가 업로드한 파일 명 : ", originalname);
    console.log("파일의 엔코딩 타입 : ", encoding);
    console.log("파일의 Mime 타입 : ", mimetype);
    console.log("파일이 저장된 폴더 : ", destination);
    console.log("destination에 저장된 파일 명 : ", filename);
    console.log("업로드된 파일의 전체 경로 ", path);
    console.log("파일의 바이트(byte 사이즈)", size);
    */

    ctx.body = {ok: true, data: "Single Upload Ok"}
    //const IMG_URL = `https://hnu-whereeat.s3.ap-northeast-2.amazonaws.com/${req.file.originalname}`;
    //console.log(IMG_URL);
    //body.send.json({url: IMG_URL});
});