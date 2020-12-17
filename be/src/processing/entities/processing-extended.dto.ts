import { VideoDTO } from 'src/playlist/entities/video.dto';
import { ProcessingDto } from './processing.dto';

export class ProcessingExtendedDTO extends ProcessingDto {
  video: VideoDTO;

  static fromEntities(processing: ProcessingDto, video: VideoDTO) {
    const processingExtended = new ProcessingExtendedDTO();
    Object.assign(processingExtended, processing);
    processingExtended.video = video;
    return processingExtended;
  }
}
