import { ProcessingDocument } from './processing.schema';

export class ProcessingDto {
  progress: number;
  id: string;
  inputFileName: string;
  error?: {
    message: string;
  };

  static fromDocument(processingDocument: ProcessingDocument): ProcessingDto {
    const processingDto = new ProcessingDto();
    processingDto.progress = processingDocument.progress;
    processingDto.id = processingDocument._id;
    processingDto.inputFileName = processingDocument.inputFileName;
    processingDto.error = processingDocument.error;
    return processingDto;
  }
}
