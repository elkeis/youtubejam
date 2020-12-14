import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { PlaylistController } from './playlist.controller';
import { PlaylistService } from './playlist.service';
import { Video } from './entities/video.schema';

fdescribe('PlaylistController', () => {
  let controller: PlaylistController;
  const videoObject = {
    videoURL: 'test-url',
    thumbnailURL: 'test-thumb',
    processingId: 'processingId',
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlaylistController],
      providers: [
        PlaylistService,
        { 
          provide: getModelToken(Video.name),
          useValue: Video.fromObject(videoObject)
        }
      ],
    }).compile();

    controller = module.get<PlaylistController>(PlaylistController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
