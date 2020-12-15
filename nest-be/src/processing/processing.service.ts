import { HttpException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { PlaylistService } from '../playlist/playlist.service';
import { ProcessingDto } from './entities/processing.dto';
import { ProcessingExtendedDTO } from './entities/processing-extended.dto';
import { Processing, ProcessingDocument } from './entities/processing.schema';

@Injectable()
export class ProcessingService {

  constructor(
    @InjectModel(Processing.name) private processingModel: Model<ProcessingDocument>,
    private playlistService: PlaylistService,
  ) { }

  async createProcessing(inputFileName: string): Promise<ProcessingDto> {
    try {
      const newProcessing = new this.processingModel(Processing.fromObject({
        progress: 0,
        inputFileName,
      }));
      const processingDocument = await newProcessing.save();
      return ProcessingDto.fromDocument(processingDocument);
    } catch (e) {
      throw new InternalServerErrorException(e, `Error during create processing for ${inputFileName}`);
    }
  }

  async updateWithProgress(processingId: string, progress: number): Promise<ProcessingDto> {
    try {
      const processingDocument = await this.processingModel.updateOne({
        _id: processingId
      }, {
        $set: {
          progress
        }
      });
      return ProcessingDto.fromDocument(processingDocument);
    } catch (e) {
      throw new InternalServerErrorException(e, `Error during updating progress for ${processingId} processing`);
    }
  }


  async updateWithError(processingId: string, error: Error): Promise<ProcessingDto> {
    try {
      const processingDocument = await this.processingModel.updateOne({
        _id: processingId
      }, {
        $set: {
          error: {
            message: error.message
          }
        }
      });
      return ProcessingDto.fromDocument(processingDocument);
    } catch (e) {
      throw new InternalServerErrorException(e, `Error during setting an error for ${processingId} processing`);
    }
  }

  /**
   * fetches processing object, and if its completed add video entry to it. 
   * @param {*} processingId 
   */
  async fetchProcessingResult(processingId) {
    try {
      const processingDocument = await this.processingModel.findById(processingId);
      
      if (!processingDocument) {
        throw new NotFoundException(`Can't find any processing with id ${processingId}`);
      }

      let processing = ProcessingDto.fromDocument(processingDocument);

      if (processing.progress === 100) {
        const video = await this.playlistService.fetchVideoByProcessingId(processing.id);
        processing = ProcessingExtendedDTO.fromEntities(processing, video);
      }
      return processing;
    } catch (e) {
      console.error(e);
      throw (e instanceof HttpException ? 
        e : new InternalServerErrorException(e, `Error during fetching processing with ${processingId} processingId`)
      );
    }
  }
}
