import { HttpException, Injectable, InternalServerErrorException, UploadedFile } from '@nestjs/common';
import { ProcessingDto } from 'src/processing/entities/processing.dto';
import { ProcessingService } from 'src/processing/processing.service';
import { FfmpegService } from './ffmpeg/ffmpeg.service';
import { OutputService } from './output/output.service';

@Injectable()
export class UploadService {

  constructor(
    private processingService: ProcessingService,
    private ffmpegService: FfmpegService,
    private outputService: OutputService,
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
