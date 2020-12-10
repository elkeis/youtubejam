const { promises: fs } = require('fs');

const {
    fetchVideos,
} = require('../datasources/videos');

module.exports = {
    async fetchPlaylist() {
        return await fetchVideos();
    },
}