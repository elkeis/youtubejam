import { Controller, Get, Param } from '@nestjs/common';
import { ProcessingService } from './processing.service';

@Controller('processing')
export class ProcessingController {
  constructor(private processingService: ProcessingService) {}

  @Get(':id')
  async fetchProcessingById(@Param('id') processingId: string) {
    return await this.processingService.fetchProcessingResult(processingId);
  }
}
