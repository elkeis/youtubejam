const { promises: fs } = require('fs');

module.exports = {
    async fetchPlaylist() {
        const direntList = await fs.readdir('./videos', { withFileTypes: true });
        return direntList
            .filter(dirent => dirent.isDirectory())
            .map(dirent => ({
                id: dirent.name,
                name: dirent.name,
                videoURL: `/${dirent.name}/output.m3u8`
            }));
    }
}