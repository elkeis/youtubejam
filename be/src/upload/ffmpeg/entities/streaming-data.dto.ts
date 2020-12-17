import { HlsData } from './hls-data';
import { ThumbnailData } from './thumbnail-data';

export class StreamingData {
  thumbnailPath: string;
  videoPath: string;

  static fromEntities(
    hlsData: HlsData,
    thumbnailData: ThumbnailData,
  ): StreamingData {
    const streamingData = new StreamingData();
    streamingData.thumbnailPath = thumbnailData.thumbnailPath;
    streamingData.videoPath = hlsData.m3u8FilePath;
    return streamingData;
  }
}
