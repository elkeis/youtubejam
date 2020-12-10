const combineRouters = require('koa-combine-routers');
const playlistRouter = require('./playlist');
const uploadRouter = require('./upload');
const processingRouter = require('./processing');

const router = combineRouters(
    playlistRouter,
    uploadRouter,
    processingRouter,
);

module.exports = router;
