const formidable = require('formidable');

const UPLOAD_DIR = './uploads';


module.exports = {
    async readMultipartFormDataStream(req) {
        
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
    }
}