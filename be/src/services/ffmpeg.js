const { rejects } = require('assert');
const ffmpeg = require('fluent-ffmpeg');
const { promises: fs } = require('fs');
const { createProcessingError } = require('../../errors');


const OUTPUT_DIR = './videos';
const HLS_EXT = 'm3u8';
const VIDEO_RESOLUTION = '640x360';
const HLS_OPTIONS = [
    '-profile:v baseline',
    '-level 3.0',
    `-s ${VIDEO_RESOLUTION}`,
    '-start_number 0',
    '-hls_time 6',
    '-hls_list_size 0'
]

const THUMBNAIL_FILENAME = 'thumbnail.png';

const FFMPEG_START_EVENT = 'start';
const FFMPEG_PROGRESS_EVENT = 'progress';
const FFMPEG_END_EVENT = 'end';
const FFMPEG_ERROR_EVENT = 'error';

async function generateHLS(inputFileName, outputFilePath) {
    try {
        const hlsOutputFilePath = `${outputFilePath}.${HLS_EXT}`;
        const hlsData = await new Promise((resolve, reject) => {
            ffmpeg(inputFileName)
                .addOptions(HLS_OPTIONS)
                .toFormat('hls')
                .output(hlsOutputFilePath)
                .on(FFMPEG_START_EVENT, () => {
                    console.log(`Convert ${inputFileName} to HLS format`);
                })
                .on(FFMPEG_PROGRESS_EVENT, progress => {
                    console.log('Processing: ' + progress.percent + '% done');
                })
                .on(FFMPEG_END_EVENT, () => {
                    console.log(`Converted successfully, output: ${hlsOutputFilePath}`);
                    resolve({
                        hlsPlaylistPath: hlsOutputFilePath,
                    })
                })
                .on(FFMPEG_ERROR_EVENT, error => {
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
                .on(FFMPEG_PROGRESS_EVENT, progress => {
                    console.log('Processing: ' + progress.percent + '% done');
                })
                .on(FFMPEG_END_EVENT, () => {
                    console.log(`Thumbnails generated successfully, output: ${outputDir}/${THUMBNAIL_FILENAME}`);
                    resolve({
                        thumbnailFilePath: `${outputDir}/${THUMBNAIL_FILENAME}`,
                    })
                })
                .on(FFMPEG_ERROR_EVENT, error => {
                    reject(error);
                })
            .screenshots({
                timestamps: ['1%'],
                filename: THUMBNAIL_FILENAME,
                folder: outputDir,
                size: VIDEO_RESOLUTION,
            })
        });
        return thumbnailData;
    } catch (e) {
        throw e;
    }
}


module.exports = {
    async convertToHLS(inputFileName, outputFileName = 'output') {
        try {
            const date = new Date();
            const outputDir = `${OUTPUT_DIR}/${date.getTime()}`;
            const outputFilePath = `${outputDir}/${outputFileName}`;
            await fs.mkdir(outputDir);
    
            const hlsData = await generateHLS(inputFileName, outputFilePath);
            const thumbnailData = await generateThumbnails(inputFileName, outputDir);
            return { hlsData, thumbnailData };
        } catch (e) {
            throw createProcessingError(e);
        }
    }
}
// -profile:v baseline -level 3.0 -s 640x360 -start_number 0 -hls_time 10 -hls_list_size 0