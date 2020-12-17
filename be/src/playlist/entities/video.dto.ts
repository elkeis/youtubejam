import { VideoDocument } from './video.schema';

export class VideoDTO {
  static fromDocument(video: VideoDocument): VideoDTO {
    return new VideoDTO(
      video.videoURL,
      video.thumbnailURL,
      video.processingId,
      video._id,
    );
  }

  constructor(
    public videoURL: string,
    public thumbnailURL: string,
    public processingId: string,
    public id?: string,
  ) {}
}
