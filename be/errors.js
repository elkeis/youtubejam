/**
 * ERROR TYPES
 */
const DATASOURCE_ERROR = 'youtubejam/error/DATASOURCE';
const PROCESSING_ERROR = 'youtubejam/error/PROCESSING';
const UPLOADING_ERROR = 'youtubejam/error/UPLOADING';
const UNKNOWN_ERROR = 'youtubejam/error/UNKNOWN';

class YouTubeJamError extends Error {
    constructor({
        type,
        name,
        message, 
        stack,
    }) {
        super(name, message, stack);
        this.errorObject = { type, name, message };
    }
}


function createErrorObject(type, {
    message = 'no message',
    name = 'unnamed',
    stack,
}) {
    return new YouTubeJamError({
        type,
        message,
        name,
        stack,
    });
}

module.exports = {
    types: {
        DATASOURCE_ERROR,
        PROCESSING_ERROR,
        UPLOADING_ERROR,
        UNKNOWN_ERROR,
    },
    
    createDataSourceError: e => createErrorObject(DATASOURCE_ERROR, e),
    createProcessingError: e => createErrorObject(PROCESSING_ERROR, e),
    createUploadingError: e => createErrorObject(UPLOADING_ERROR, e),
    createUnknownError: e => createErrorObject(UNKNOWN_ERROR, e),

    isKnownError(e) {
        return e instanceof YouTubeJamError;
    }
}