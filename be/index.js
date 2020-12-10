const Koa = require('koa');
const serve = require('koa-static');
const Router = require('koa-router');
const koaBody = require('koa-body');
const {
  initStorage
} = require('./src/datasources/storage');

const {
  readMultipartFormDataStream
} = require('./src/services/upload');

const {
  convertToHLS
} = require ('./src/services/ffmpeg');

const {
    fetchPlaylist,
} = require('./src/services/playlist');

const app = new Koa();
const router = new Router();


router.get('/', async (ctx) => {
    ctx.body = `Request Body: ${JSON.stringify(ctx.request.body)}`;
});

router.get('/playlist', async ctx => {
    const playlist = await fetchPlaylist();
    ctx.body = playlist;
})

router.post('/upload', async (ctx, next) => {
    console.log('/upload POST METHOD')
    const formData = await readMultipartFormDataStream(ctx.req);
    console.log(`formData = ${JSON.stringify(formData)}`);

    const result = await convertToHLS(formData.files.video.path);

    ctx.body = result;
    
    await next();
    return;
});

app
    .use(router.routes())
    .use(router.allowedMethods())
    .use(serve(__dirname + '/videos'));

initStorage().then((storage) => {
  console.log(`using in-memory storage: ${JSON.stringify(storage, null, '\t')}`)
  app.listen(4000);
});