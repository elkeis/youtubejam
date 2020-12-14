import { Injectable } from '@nestjs/common';
import ffmpeg from 'fluent-ffmpeg';
import fs from 'fs/promises'
import { StreamingData } from './entities/streaming-data';
import { ThumbnailData } from './entities/thumbnail-data';


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

@Injectable()
export class FfmpegService {
  
  public async generateHLS(
    inputFileName: string, 
    hlsOutputFilePath: string, 
    onProgress: ( percent : number ) => any = () => {},
  ): Promise<StreamingData> {
    try {
      await new Promise<void>((resolve, reject) => {
        ffmpeg(inputFileName)
          .addOptions(HLS_OPTIONS)
          .toFormat('hls')
          .output(hlsOutputFilePath)
          .on(FFMPEG_START_EVENT, () => {
            console.log(`Convert ${inputFileName} to HLS format`);
          })
          .on(FFMPEG_PROGRESS_EVENT, progress => onProgress(progress.percent))
          .on(FFMPEG_END_EVENT, async () => {
            console.log(`Converted successfully, output: ${hlsOutputFilePath}`);
            // const processing = await updateProcessing(processingId, { progress: 100 });
            // await fs.rm(processing.inputFileName);
            resolve();
          })
          .on(FFMPEG_ERROR_EVENT, error => {
            // updateProcessing(processingId, {
            //   error: createProcessingError(error).errorObject
            // });
            reject(error);
          })
          .run();
      });
      return new StreamingData(hlsOutputFilePath);
    } catch (e) {
      throw e;
    }
  }


  public async generateThumbnails(
    inputFileName: string, 
    outputDir: string
  ): Promise<ThumbnailData> {
    try {
      const thumbnailData = await new Promise<ThumbnailData>((resolve, reject) => {
        ffmpeg(inputFileName)
          .on(FFMPEG_START_EVENT, () => {
            console.log(`Generate thumbnails for ${inputFileName}`);
          })
          .on(FFMPEG_END_EVENT, () => {
            console.log(`Thumbnails generated successfully, output: ${outputDir}/${THUMBNAIL_FILENAME}`);
            resolve(new ThumbnailData(`${outputDir}/${THUMBNAIL_FILENAME}`));
          })
          .on(FFMPEG_ERROR_EVENT, error => {
            reject(error);
          })
          .screenshots({
            timestamps: ['1%'],
            filename: THUMBNAIL_FILENAME,
            folder: outputDir,
          })
      });
      return thumbnailData;
    } catch (e) {
      throw e;
    }
  }
}
