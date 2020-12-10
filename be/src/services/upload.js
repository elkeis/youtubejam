const formidable = require('formidable');
const { createUploadingError, } = require('../errors');
const { prepareForStream } = require ('./processing');
const UPLOAD_DIR = './uploads';

async function readMultipartFormDataStream(req) {
    try {
        const form = formidable({
            multiples: true,
            keepExtensions: true,
            uploadDir: UPLOAD_DIR,
        });

        const result = await new Promise((resolve, reject) => {
            form.parse(req, (err, fields, files) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve({ fields, files });
            });
        });

        return result
    } catch (e) {
        throw createUploadingError(e);
    }
}

module.exports = {
    readMultipartFormDataStream,
}