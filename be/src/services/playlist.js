const { promises: fs } = require('fs');

const {
    fetchVideos,
} = require('../datasources/videos');

module.exports = {
    /**
     * fetches playlist from storage
     */
    async fetchPlaylist() {
        return await fetchVideos();
    },
}