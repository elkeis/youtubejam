import { Model } from 'mongoose';
import {
  HttpException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Video, VideoDocument } from './entities/video.schema';
import { VideoDTO } from './entities/video.dto';

@Injectable()
export class PlaylistService {
  constructor(
    @InjectModel(Video.name) private videoModel: Model<VideoDocument>,
  ) {}

  async fetchPlaylist(): Promise<Array<VideoDTO>> {
    try {
      const playlistDocuments = (await this.videoModel.find()) || [];
      return playlistDocuments.map(VideoDTO.fromDocument);
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  async fetchVideoByProcessingId(processingId): Promise<VideoDTO> {
    try {
      const videoDocument = await this.videoModel.findOne({ processingId });
      if (!videoDocument) {
        throw new NotFoundException(
          `There is no videos with processingId: ${processingId}`,
        );
      }
      return VideoDTO.fromDocument(videoDocument);
    } catch (e) {
      throw e instanceof HttpException
        ? e
        : new InternalServerErrorException(
            e,
            `Error during finding video with ${processingId} processing id`,
          );
    }
  }

  async createVideo(videoDTO: VideoDTO) {
    try {
      const newVideo = new this.videoModel(Video.fromObject(videoDTO));
      return newVideo.save();
    } catch (e) {
      throw new InternalServerErrorException(e, `Error during creating video`);
    }
  }
}
