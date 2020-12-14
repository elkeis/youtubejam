import { HttpException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PlaylistService } from '../playlist/playlist.service';
import { ProcessingDto } from './entities/processing.dto';
import { Processing, ProcessingDocument } from './entities/processing.schema';
// import { ThumbnailData } from './ffmpeg/entities/thumbnail-data';
// import { FfmpegService } from './ffmpeg/ffmpeg.service';
// import { OutputService } from './output/output.service';

const OUTPUT_FILENAME = 'output';
const HLS_EXT = 'm3u8';

@Injectable()
export class ProcessingService {

  constructor(
    @InjectModel(Processing.name) private processingModel: Model<ProcessingDocument>,
    private playlistService: PlaylistService,
    // private ffmpegService: FfmpegService,
    // private outputService: OutputService,
    // private hlsExtension: string = HLS_EXT,
    // private outputFileName: string = OUTPUT_FILENAME,
  ) { }

  // /**
  //  * Preparing file for streaming using HLS protocol.
  //  * Returns promise which resolves with processing information
  //  * 
  //  * @param {string} inputFileName - .mp4 file on disk
  //  * @param {string} outputFileName - whatever 
  //  * @returns {
  //  *      Promise<{
  //  *          id, progress,  
  //  *      }>
  //  * } - dataProcessingPromise 
  //  */
  // async prepareForStream(
  //   inputFileName: string,
  // ) {
  //   try {
  //     const outputDir = await this.outputService.createOutputDir();
  //     const outputFilePath = `${outputDir}/${this.outputFileName}`;
  //     const hlsOutputFilePath = `${outputFilePath}.${HLS_EXT}`;
      
  //     const thumbnailData: ThumbnailData = await this.ffmpegService.generateThumbnails(inputFileName, outputDir)
  //     this.ffmpegService.generateHLS(inputFileName, hlsOutputFilePath, percent => {

  //     });

  //     const processing = await insertProcessing (
  //       Processing.fromObject({
  //         inputFileName,
  //         progress: 0,
  //       })
  //     )

  //     this.generateHLS(inputFileName, hlsOutputFilePath, processing.id).then(() => {
  //       insertVideo({
  //         videoURL: hlsOutputFilePath.split(OUTPUT_DIR)[1],
  //         thumbnailURL: thumbnailData.thumbnail.split(OUTPUT_DIR)[1],
  //         path: outputDir,
  //         processingId: processing.id,
  //       });
  //     }).catch(error => {
  //       updateProcessing(processing.id, {
  //         error: createProcessingError(error)
  //       });
  //     });

  //     return {
  //       processingId: processing.id,
  //       progress: processing.progress,
  //     };
  //   } catch (e) {
  //     throw createProcessingError(e);
  //   }
  // }

  async createProcessing(inputFileName: string) {
    try {
      const newProcessing = new this.processingModel(Processing.fromObject({
        progress: 0,
        inputFileName,
      }));
      return newProcessing.save();
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  /**
   * fetches processing object, and if its completed add video entry to it. 
   * @param {*} processingId 
   */
  // async fetchProcessingResult(processingId) {
  //   try {
  //     const processingDocument = await this.processingModel.findById(processingId);
      
  //     if (!processingDocument) {
  //       throw new NotFoundException(`Cant find anything with id ${processingId}`);
  //     }

  //     const processing = ProcessingDto.fromDocument(processingDocument);

  //     if (processing.progress === 100) {
  //       const vide = await this.playlistService.
  //       result.video = video;
  //     }
  //     return result;
  //   } catch (e) {
  //     if (e instanceof HttpException) {
  //       throw e;
  //     } else {
  //       throw new InternalServerErrorException(e);
  //     }
  //   }
  // }
}
