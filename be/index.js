const Koa = require('koa');
const serve = require('koa-static');
const koaBody = require('koa-body');
const router = require('./src/api');

const { initStorage, } = require('./src/datasources/storage');

const app = new Koa();

app
  .use(router())
  .use(serve(__dirname + '/videos'));

initStorage().then((storage) => {
  console.log(`using in-memory storage: ${JSON.stringify(storage, null, '\t')}`)
  app.listen(4000);
});