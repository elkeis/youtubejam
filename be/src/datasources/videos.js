const {
    storage, insertVideo,
} = require('./storage');

module.exports = {
    async fetchVideos() {
        return storage.videos;
    },

    insertVideo,
}