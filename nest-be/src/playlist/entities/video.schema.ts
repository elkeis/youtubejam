
import { Prop, Schema, SchemaFactory, PropOptions } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type VideoDocument = Video & Document;

@Schema()
export class Video {

  @Prop()
  videoURL: string;

  @Prop()
  thumbnailURL: string;

  @Prop()
  processingId: string;

  static fromObject( {
    videoURL,
    thumbnailURL,
    processingId,
  }: Video): Video {
      const video = new Video();
      video.videoURL = videoURL;
      video.thumbnailURL = thumbnailURL;
      video.processingId = processingId;
      return video;
  }
}

export const VideoSchema = SchemaFactory.createForClass(Video);