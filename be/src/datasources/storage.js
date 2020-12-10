const { promises: fs } = require('fs');
const uniqid = require('uniqid');
const storage = {
    videos: [],
    processings: [],
    initiated: false,
}

/**
 * make sure that directories exists
 */
async function createDirectories() {
    try {
        await fs.mkdir('./videos');
        await fs.mkdir('./uploads');
    } finally {
        return;
    }
}

async function initStorage() {
    if (storage.initiated) return storage;

    await createDirectories();

    {
        const direntList = await fs.readdir('./videos', { withFileTypes: true });
        storage.videos.push(
            ...direntList
                .filter(dirent => dirent.isDirectory())
                .map(dirent => ({
                    id: uniqid(),
                    videoURL: `/${dirent.name}/output.m3u8`,
                    thumbnailURL: `/${dirent.name}/thumbnail.png`,
                }))
        );

    }

    storage.initiated = true;
    return storage;
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
    insertVideo,
    insertProcessing,
};

