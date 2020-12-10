const { promises: fs } = require('fs');
const uniqid = require('uniqid');
const uploads = require('./uploads');
const storage = {
    uploads: [],
    videos: [],
    processings: [],
    initiated: false,
}

const VIDEOS_DIRECTORY = './videos';
const UPLOADS_DIRECTORY = './uploads';

async function initStorage() {
    if (storage.initiated) return storage;

    {
        const direntList = await fs.readdir('./videos', { withFileTypes: true });
        storage.videos.push(
            ...direntList
                .filter(dirent => dirent.isDirectory())
                .map(dirent => ({
                    id: uniqid(),
                    videoURL: `/${dirent.name}/output.m3u8`,
                    thumbnailURL: `/${dirent.name}/thumbnail.png`,
                    path: `${VIDEOS_DIRECTORY}/${dirent.name}/output.m3u8`,
                }))
        );

    }

    {
        const direntList = await fs.readdir('./uploads', { withFileTypes: true });
        storage.uploads.push(
            ...direntList
                .filter(dirent => dirent.isFile())
                .map(dirent => ({
                    id: uniqid(),
                    path: `${UPLOADS_DIRECTORY}/${dirent.name}`,
                    hasBeenProcessed: true,
                }))
        );
    }

    storage.initiated = true;
    return storage;
}


function insertUpload({ 
    path, 
    hasBeenProcessed,
}) {
    const u = {
        id: uniqid(),
        path,
        hasBeenProcessed
    };
    uploads.push(u);
    return u;
}

function insertVideo({ 
    videoURL,
    thumbnailURL,
    path,
    ...rest
}) {
    const v = {
        id: uniqid(),
        videoURL,
        thumbnailURL,
        path,
        ...rest,
    }
    storage.videos.push(v);
    return v;
}

function insertProcessing({
    progress = 0,
    ...rest
}) {
    const processing = {
        id: uniqid(),
        progress,
        ...rest,
    }
    storage.processings.push(processing);
    return processing;
}

module.exports = {
    storage,
    initStorage,
    insertUpload,
    insertVideo,
    insertProcessing,
};

