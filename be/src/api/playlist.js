const Router = require('koa-router');
const { fetchPlaylist, } = require('../services/playlist');
const { processError } = require('./error');

const router = new Router({prefix: '/playlist'});

router.get('/', async (ctx, next) => {
    try {
        const playlist = await fetchPlaylist();
        ctx.body = playlist;
        await next();
    } catch (e) {
        processError(e);
    }
})

module.exports = router;