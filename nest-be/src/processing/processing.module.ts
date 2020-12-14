import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlaylistModule } from 'src/playlist/playlist.module';
import { Processing, ProcessingSchema } from './entities/processing.schema';
import { ProcessingController } from './processing.controller';
import { ProcessingService } from './processing.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Processing.name,
        schema: ProcessingSchema,
      }
    ]),
    PlaylistModule
  ],
  controllers: [ProcessingController],
  providers: [ProcessingService],
})
export class ProcessingModule {}
