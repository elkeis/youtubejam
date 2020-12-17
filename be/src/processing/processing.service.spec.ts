import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { PlaylistService } from '../playlist/playlist.service';
import { Processing } from './entities/processing.schema';
import { ProcessingService } from './processing.service';

describe('ProcessingService', () => {
  let service: ProcessingService;
  let processingDocument;
  let videoDTO;
  let processingModelMock;
  let playlistService;

  beforeEach(async () => {
    class ProcessingModelMock {
      constructor(obj) {
        processingDocument = { ...obj, ...processingDocument };
      }
      save = () => new Promise((resolve) => resolve(processingDocument));
      static findById = jest
        .fn()
        .mockImplementation(
          () => new Promise((resolve) => resolve(processingDocument)),
        );
    }

    processingDocument = {
      _id: '_id',
    };
    processingModelMock = ProcessingModelMock;

    playlistService = {
      fetchVideoByProcessingId: jest
        .fn()
        .mockImplementation(() => new Promise((resolve) => resolve(videoDTO))),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProcessingService,
        {
          provide: getModelToken(Processing.name),
          useValue: ProcessingModelMock,
        },
        {
          provide: PlaylistService.name,
          useValue: playlistService,
        },
      ],
    }).compile();

    service = module.get<ProcessingService>(ProcessingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Create processing', () => {
    it('should be resolved with processing dto ', async () => {
      processingDocument = {
        _id: '5',
        progress: 12,
        inputFileName: 'test',
      };
      const processing = await service.createProcessing('test');
      expect(processing).toEqual({
        id: '5',
        progress: 12,
        inputFileName: 'test',
      });
    });
  });

  describe('Fetch Processing Result', () => {
    it('should be resolved with processing with expected id', async () => {
      processingDocument = {
        _id: '5',
        progress: 12,
        inputFileName: 'test',
      };
      const processing = await service.fetchProcessingResult('5');
      expect(processingModelMock.findById).toHaveBeenCalledWith('5');
      expect(processing).toEqual({
        progress: 12,
        inputFileName: 'test',
        id: '5',
      });
    });

    it('should return extended processing if finished', async () => {
      processingDocument = {
        _id: '5',
        progress: 100,
        inputFileName: 'test',
      };
      videoDTO = {
        id: 23,
      };
      const processing = await service.fetchProcessingResult('5');
      expect(playlistService.fetchVideoByProcessingId).toHaveBeenCalledWith(
        '5',
      );
      expect(processing).toEqual({
        progress: 100,
        inputFileName: 'test',
        id: '5',
        video: {
          id: 23,
        },
      });
    });
  });
});
