const {
    storage,
    insertUpload
} = require('./storage');

module.exports = {
    async fetchUploads() {
        return storage.uploads;
    },

    async insertUpload(upload) {
        return insertUpload(upload);
    }
}