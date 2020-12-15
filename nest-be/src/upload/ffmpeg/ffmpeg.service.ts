import { HttpException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { ProcessingDto } from 'src/processing/entities/processing.dto';
import { HlsData } from './entities/hls-data';
import { StreamingData } from './entities/streaming-data.dto';
import { ThumbnailData } from './entities/thumbnail-data';
const ffmpeg = require('fluent-ffmpeg');


const VIDEO_RESOLUTION = '640x360';
const HLS_OPTIONS = [
    '-profile:v baseline',
    '-level 3.0',
    // `-s ${VIDEO_RESOLUTION}`,
    '-start_number 0',
    '-hls_time 6',
    '-hls_list_size 0'
]
const HLS_EXTENSION = 'm3u8';

const THUMBNAIL_FILENAME = 'thumbnail.png';

const FFMPEG_START_EVENT = 'start';
const FFMPEG_PROGRESS_EVENT = 'progress';
const FFMPEG_END_EVENT = 'end';
const FFMPEG_ERROR_EVENT = 'error';

@Injectable()
export class FfmpegService {
  
  async generateHLS(
    inputFileName: string, 
    outputDir: string, 
    onProgress: ( percent : number ) => any = () => {},
  ): Promise<HlsData> {
    try {
      const outputFileName = `${outputDir}/${inputFileName}.${HLS_EXTENSION}`;
      await new Promise<void>((resolve, reject) => {
        ffmpeg(inputFileName)
          .addOptions(HLS_OPTIONS)
          .toFormat('hls')
          .output(outputFileName)
          .on(FFMPEG_START_EVENT, () => {
            console.log(`Convert ${inputFileName} to HLS format`);
          })
          .on(FFMPEG_PROGRESS_EVENT, progress => onProgress(progress.percent))
          .on(FFMPEG_END_EVENT, async () => {
            console.log(`Converted successfully, output: ${outputFileName}`);
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
      return new HlsData(outputFileName);
    } catch (e) {
      throw e;
    }
  }


  async generateThumbnails(
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

  async prepareForStream(
    processing: ProcessingDto,
    outputDir: string,
    onProgress: (progressPercent: number) => any,
    onError: (e: HttpException) => any,
  ) : Promise<StreamingData> {
    try {
      const thumbnailData = await this.generateThumbnails(processing.inputFileName, outputDir);
      const hlsData = await this.generateHLS(
        processing.inputFileName, 
        outputDir, 
        onProgress || (() => {})
      );
      return StreamingData.fromEntities(hlsData, thumbnailData);
    } catch (e) {
      const error = new InternalServerErrorException(e, 'Video conversion error');
      onError(error);
      console.error(error);
    }
  }
}
