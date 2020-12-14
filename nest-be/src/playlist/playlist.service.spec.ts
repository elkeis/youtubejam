import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { PlaylistService } from './playlist.service';
import { Video, VideoDocument } from './entities/video.schema';
import { VideoDTO } from './entities/video.dto';

describe('PlaylistService', () => {
  let service: PlaylistService;
  let videoModel: any;
  let videos: Array<Video>;


  beforeEach(async () => {
    videos = [{
      videoURL: 'videoURL0',
      thumbnailURL: 'thumbnailURL0',
      processingId: 'processingId',
    }];
    videoModel = {
      find: jest.fn().mockResolvedValue(videos)
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlaylistService,
        { 
          provide: getModelToken(Video.name),
          useValue: videoModel
        }
      ],
    }).compile();

    service =  module.get<PlaylistService>(PlaylistService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('fetch playlist', () => {
    it('should be resolved with array of corresponding DTOs', async done => {
      const playlist = await service.fetchPlaylist();
      expect(playlist instanceof Array ).toBeTruthy();
      done();
    })
  });
});
