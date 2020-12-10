const Router = require('koa-router');
const koaBody = require('koa-body');
const { fetchProcessingResult } = require ('../services/processing');
const { processError } = require('./error');

const router = new Router({prefix: '/processing'});

router.get('/', async (ctx, next) => {
    try {
        ctx.body = await fetchProcessingResult(ctx.query?.processingId)
        await next();
    } catch (e) {
        processError(e, ctx);
    }
});

module.exports = router;