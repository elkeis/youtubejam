import { HttpException, Injectable, InternalServerErrorException, UploadedFile } from '@nestjs/common';
import { VideoDTO } from 'src/playlist/entities/video.dto';
import { PlaylistService } from 'src/playlist/playlist.service';
import { ProcessingDto } from 'src/processing/entities/processing.dto';
import { ProcessingService } from 'src/processing/processing.service';
import { StreamingData } from './ffmpeg/entities/streaming-data.dto';
import { FfmpegService } from './ffmpeg/ffmpeg.service';
import { OutputService } from './output/output.service';
import { 
  VIDEOS_DIR,
  SERVE_ROOT,
} from '../config';
@Injectable()
export class UploadService {

  constructor(
    private processingService: ProcessingService,
    private ffmpegService: FfmpegService,
    private outputService: OutputService,
    private playlistService: PlaylistService,
  ) {}

  async startProcessing(filePath: string): Promise<ProcessingDto> {
    try {
      const processing = await this.processingService.createProcessing(filePath);
      const outputDir = await this.outputService.createOutputDir();
      this.ffmpegService.prepareForStream(
        processing, 
        outputDir, 
        percent => {
          this.processingService.updateWithProgress(processing.id, percent);
        },
        (streamingData: StreamingData) => {
          this.processingService.updateWithProgress(processing.id, 100);
          this.playlistService.createVideo(new VideoDTO(
            streamingData.videoPath.replace(VIDEOS_DIR, SERVE_ROOT), 
            streamingData.thumbnailPath.replace(VIDEOS_DIR, SERVE_ROOT), 
            processing.id
          ))
        },
        error => {
          this.processingService.updateWithError(processing.id, error);
        }
      );
      return processing;
    } catch (e) {
      throw ( e instanceof HttpException ? 
        e : new InternalServerErrorException(e, `Error during processing of ${filePath}`)
      );
    }
  }
}
