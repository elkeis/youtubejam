import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { PlaylistController } from './playlist.controller';
import { PlaylistService } from './playlist.service';
import { Video } from './entities/video.schema';

describe('PlaylistController', () => {
  let controller: PlaylistController;
  let videoObject;
  let playlist;
  beforeEach(async () => {
    videoObject = {
      videoURL: 'test-url',
      thumbnailURL: 'test-thumb',
      processingId: 'processingId',
    };
    playlist = [videoObject];

    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlaylistController],
      providers: [
        {
          provide: PlaylistService.name,
          useValue: {
            fetchPlaylist: jest.fn().mockResolvedValue(playlist)
          }
        },
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

  describe('fetch playlist', () => {
    it('should return playlist', async () => {
      const playlist = await controller.getAll();
      expect(playlist).toEqual(playlist);
    });
  });
});
