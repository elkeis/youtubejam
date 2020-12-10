const Koa = require('koa');
const serve = require('koa-static');
const Router = require('koa-router');
const koaBody = require('koa-body');
const {
  initStorage,
} = require('./src/datasources/storage');

const {
  fetchVideos,
} = require('./src/datasources/videos');

const {
  readMultipartFormDataStream
} = require('./src/services/upload');

const {
  prepareForStream
} = require ('./src/services/ffmpeg');

const {
    fetchPlaylist,
    addNewEntryToPlaylist,
} = require('./src/services/playlist');

const  {
  types,
  isKnownError,
  createUnknownError,
} = require('./errors');

const app = new Koa();
const router = new Router();


router.get('/', async (ctx) => {
    ctx.body = `Request Body: ${JSON.stringify(ctx.request.body)}`;
});

router.get('/playlist', async ctx => {
    try {
      const playlist = await fetchVideos();
      ctx.body = playlist;
    } catch (e) {
      processError(e);
    }
})

router.post('/upload', async (ctx, next) => {
    console.log('/upload POST METHOD')
    try {
      const formData = await readMultipartFormDataStream(ctx.req);
      console.log(`formData = ${JSON.stringify(formData)}`);
      const result = await prepareForStream(formData.files.video.path);
      
      ctx.body = result;
      await next();
      return;

    } catch (e) {
      processError(e, ctx);
    }
});

function processError(e, ctx) {
  console.log('got en error, processing')
  debugger;
  const {
    errorObject
  } =  (isKnownError(e) ? e : createUnknownError(e));
  console.log(JSON.stringify(errorObject, null, '\t'))
  const errorResponse  = {
    error: errorObject,
  }

  switch (errorObject.type) {
    case types.DATASOURCE_ERROR: 
    ctx.status = 404;
    break;
    default: 
    ctx.status = 500;
  }
  ctx.state = errorResponse;
  ctx.body = JSON.stringify(errorResponse);

  return;
}

app
  .use(router.routes())
  .use(router.allowedMethods())
  .use(serve(__dirname + '/videos'));

initStorage().then((storage) => {
  console.log(`using in-memory storage: ${JSON.stringify(storage, null, '\t')}`)
  app.listen(4000);
});