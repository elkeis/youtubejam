const formidable = require('formidable');
const {
    createUploadingError,
} = require('../../errors');
const UPLOAD_DIR = './uploads';


module.exports = {
    async readMultipartFormDataStream(req) {
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
}