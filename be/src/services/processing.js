const { rejects } = require('assert');
const ffmpeg = require('fluent-ffmpeg');
const { promises: fs } = require('fs');
const { createProcessingError, createDataSourceError } = require('../errors');
const {
    insertProcessing,
    findProcessing,
    updateProcessing,
} = require('../datasources/processing');

const {
    insertVideo, findVideoByProcessingId,
} = require('../datasources/videos');
 

const OUTPUT_DIR = './videos';
const HLS_EXT = 'm3u8';
const VIDEO_RESOLUTION = '640x360';
const HLS_OPTIONS = [
    '-profile:v baseline',
    '-level 3.0',
    // `-s ${VIDEO_RESOLUTION}`,
    '-start_number 0',
    '-hls_time 6',
    '-hls_list_size 0'
]

const THUMBNAIL_FILENAME = 'thumbnail.png';

const FFMPEG_START_EVENT = 'start';
const FFMPEG_PROGRESS_EVENT = 'progress';
const FFMPEG_END_EVENT = 'end';
const FFMPEG_ERROR_EVENT = 'error';

async function generateHLS(inputFileName, hlsOutputFilePath, processingId) {
    try {
        const hlsData = await new Promise((resolve, reject) => {
            ffmpeg(inputFileName)
                .addOptions(HLS_OPTIONS)
                .toFormat('hls')
                .output(hlsOutputFilePath)
                .on(FFMPEG_START_EVENT, () => {
                    console.log(`Convert ${inputFileName} to HLS format`);
                })
                .on(FFMPEG_PROGRESS_EVENT, progress => {
                    updateProcessing(processingId, { progress: progress.percent });
                })
                .on(FFMPEG_END_EVENT, async () => {
                    console.log(`Converted successfully, output: ${hlsOutputFilePath}`);
                    const processing = await updateProcessing(processingId, { progress: 100 });
                    await fs.rm(processing.inputFileName);
                    resolve();
                })
                .on(FFMPEG_ERROR_EVENT, error => {
                    updateProcessing(processingId, {
                        error: createProcessingError(error).errorObject
                    });
                    reject(error);
                })
            .run();
        });
        return hlsData;
    } catch (e) {
        throw e;
    }
}


async function generateThumbnails(inputFileName, outputDir) {
    try {
        const thumbnailData = await new Promise((resolve, reject) => {
            ffmpeg(inputFileName)
                .on(FFMPEG_START_EVENT, () => {
                    console.log(`Generate thumbnails for ${inputFileName}`);
                })
                .on(FFMPEG_END_EVENT, () => {
                    console.log(`Thumbnails generated successfully, output: ${outputDir}/${THUMBNAIL_FILENAME}`);
                    resolve({
                        thumbnail: `${outputDir}/${THUMBNAIL_FILENAME}`,
                    })
                })
                .on(FFMPEG_ERROR_EVENT, error => {
                    reject(error);
                })
            .screenshots({
                timestamps: ['1%'],
                filename: THUMBNAIL_FILENAME,
                folder: outputDir,
                // size: VIDEO_RESOLUTION,
            })
        });
        return thumbnailData;
    } catch (e) {
        throw e;
    }
}

/**
 * Preparing file for streaming using HLS protocol.
 * Returns promise which resolves with processing information
 * 
 * @param {string} inputFileName - .mp4 file on disk
 * @param {string} outputFileName - whatever 
 * @returns {
 *      Promise<{
 *          id, progress,  
 *      }>
 * } - dataProcessingPromise 
 */
async function prepareForStream(inputFileName, outputFileName = 'output') {
    try {
        const date = new Date();
        const outputDir = `${OUTPUT_DIR}/${date.getTime()}`;
        const outputFilePath = `${outputDir}/${outputFileName}`;
        const hlsOutputFilePath = `${outputFilePath}.${HLS_EXT}`;
        await fs.mkdir(outputDir);
        const thumbnailData = await generateThumbnails(inputFileName, outputDir);
        
        const processing = await insertProcessing({
            inputFileName,
            progress: 0,
        })

        generateHLS(inputFileName, hlsOutputFilePath, processing.id).then(() => {
            insertVideo({
                videoURL: hlsOutputFilePath.split(OUTPUT_DIR)[1],
                thumbnailURL: thumbnailData.thumbnail.split(OUTPUT_DIR)[1],
                path: outputDir,
                processingId: processing.id,
            });
        }).catch(error => {
            updateProcessing(processing.id, {
                error: createProcessingError(error)
            });
        });
        
        return {
            processingId: processing.id,
            progress: processing.progress,
        };
    } catch (e) {
        throw createProcessingError(e);
    }
}

/**
 * fetches processing object, and if its completed add video entry to it. 
 * @param {*} processingId 
 */
async function fetchProcessingResult(processingId) {
    const processing = await findProcessing(processingId);
    if (!processing) { 
        throw createDataSourceError(
            new Error(`Cant find anything with id ${processingId}`)
        ) 
    }
    const result = {...processing};
    if (processing.progress === 100) {
        const video = await findVideoByProcessingId(processing.id);
        result.video = video;
    }
    return result;
}

module.exports = {
    prepareForStream,
    fetchProcessingResult,
}
// -profile:v baseline -level 3.0 -s 640x360 -start_number 0 -hls_time 6 -hls_list_size 0