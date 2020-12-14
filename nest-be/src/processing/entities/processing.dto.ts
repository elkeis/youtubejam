import { ProcessingDocument } from "./processing.schema";

export class ProcessingDto {
  progress: number;
  processingId: string;
  inputFileName: string;

  static fromDocument(processingDocument: ProcessingDocument): ProcessingDto {
    const processingDto =  new ProcessingDto();
    processingDto.progress = processingDocument.progress;
    processingDto.processingId = processingDocument._id;
    processingDto.inputFileName = processingDocument.inputFileName;
    return processingDto;
  }
}
