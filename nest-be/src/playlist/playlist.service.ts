import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Video, VideoDocument } from './entities/video.schema';
import { VideoDTO } from './entities/video.dto';

@Injectable()
export class PlaylistService {

    constructor(@InjectModel(Video.name) private videoModel: Model<VideoDocument>) {}

    async fetchPlaylist(): Promise<Array<VideoDTO>> {
        return (await this.videoModel.find()) || []
            .map(VideoDTO.fromDocument);
    }

    async createVideo (videoDTO: VideoDTO) {
        const newVideo = new this.videoModel(Video.fromObject(videoDTO));
        return newVideo.save();
    }
}