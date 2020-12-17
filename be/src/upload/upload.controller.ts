import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';

@Controller('upload')
export class UploadController {
  constructor(private uploadService: UploadService) {}

  @Post()
  @UseInterceptors(FileInterceptor('video'))
  async uploadFile(@UploadedFile() file: { path: string }) {
    const processing = await this.uploadService.startProcessing(file.path);
    return processing;
  }
}
