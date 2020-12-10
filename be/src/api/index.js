const combineRouters = require('koa-combine-routers');
const playlistRouter = require('./playlist');
const uploadRouter = require('./upload');

const router = combineRouters(
    playlistRouter,
    uploadRouter,
);

module.exports = router;
