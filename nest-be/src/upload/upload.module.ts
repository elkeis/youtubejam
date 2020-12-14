import { Module } from '@nestjs/common';
import { FfmpegService } from './ffmpeg/ffmpeg.service';
import { OutputService } from './output/output.service';
import { UploadController } from './upload.controller';

@Module({
  controllers: [UploadController],
  providers: [
    FfmpegService,
    OutputService,
  ]
})
export class UploadModule {}
