import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlaylistModule } from './playlist/playlist.module';
import { UploadModule } from './upload/upload.module';
import { ProcessingModule } from './processing/processing.module';
import { MongooseModule } from '@nestjs/mongoose';
import {
  DB_PASSWORD,
  DB_USER,
  DB_NAME,
  VIDEOS_DIR,
  SERVE_ROOT,
} from './config';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  imports: [
    PlaylistModule, 
    UploadModule, 
    ProcessingModule,
    MongooseModule.forRoot(`mongodb://db:27017/${DB_NAME}`, {
      user: DB_USER,
      pass: DB_PASSWORD,
    }),
    ServeStaticModule.forRoot({
      rootPath: VIDEOS_DIR,
      serveRoot: SERVE_ROOT,
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
