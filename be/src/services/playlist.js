const { promises: fs } = require('fs');

const {
    fetchVideos,
    insertVideo,
} = require('../datasources/videos');

module.exports = {
    async fetchPlaylist() {
        return await fetchVideos();
    },

    async addNewEntryToPlaylist({
        hlsPlaylist,
        thumbnail,
        path
    }) {
        return await insertVideo({
            videoURL: hlsPlaylist,
            thumbnailURL: thumbnail,
            path: path,
        })
    }
}