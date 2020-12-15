import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { ProcessingModule } from 'src/processing/processing.module';
import { FfmpegService } from './ffmpeg/ffmpeg.service';
import { OutputService } from './output/output.service';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { UPLOADS_DIR } from '../config';
import { PlaylistModule } from 'src/playlist/playlist.module';

@Module({
  imports: [
    MulterModule.register({
      dest: UPLOADS_DIR
    }),
    ProcessingModule,
    PlaylistModule,
  ],
  controllers: [UploadController],
  providers: [
    FfmpegService,
    OutputService,
    UploadService,
  ]
})
export class UploadModule {}
