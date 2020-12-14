import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlaylistModule } from './playlist/playlist.module';
import { UploadModule } from './upload/upload.module';
import { ProcessingModule } from './processing/processing.module';
import { MongooseModule } from '@nestjs/mongoose';
import config from './config';

@Module({
  imports: [
    PlaylistModule, 
    UploadModule, 
    ProcessingModule,
    MongooseModule.forRoot(`mongodb://db:27017/`, {
      user: config.dbUser,
      pass: config.dbPassword,
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
