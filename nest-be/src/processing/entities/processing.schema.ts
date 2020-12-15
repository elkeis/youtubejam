import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProcessingDocument = Processing & Document;

@Schema()
export class Processing {
  @Prop()
  progress: number;

  @Prop()
  inputFileName: string;

  @Prop({ type: Object})
  error?: {
    message: string,
  }

  static fromObject({
    progress,
    inputFileName
  } : Processing) {
    const processing = new Processing();
    processing.progress = progress;
    processing.inputFileName = inputFileName;
    return processing;
  }
}

export const ProcessingSchema = SchemaFactory.createForClass(Processing);