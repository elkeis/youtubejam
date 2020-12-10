const {
    storage, insertVideo,
} = require('./storage');

module.exports = {
    async fetchVideos() {
        return storage.videos;
    },

    async findVideoByProcessingId(processingId) {
        const video = storage.videos.find(v => v.processingId === processingId);
        return video;
    },

    insertVideo
}