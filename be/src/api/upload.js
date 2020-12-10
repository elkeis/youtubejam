const Router = require('koa-router');
const { readMultipartFormDataStream } = require('../services/upload');
const { prepareForStream } = require ('../services/processing');
const { processError } = require('./error');

const router = new Router({prefix: '/upload'});

router.post('/', async (ctx, next) => {
    try {
        const formData = await readMultipartFormDataStream(ctx.req);
        const result = await prepareForStream(formData.files.video.path);
        ctx.body = result;
        await next();
    } catch (e) {
        processError(e, ctx);
    }
});

module.exports = router;