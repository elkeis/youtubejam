import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { PlaylistService } from '../playlist/playlist.service';
import { Processing } from './entities/processing.schema';
import { ProcessingService } from './processing.service';

fdescribe('ProcessingService', () => {
  let service: ProcessingService;

  beforeEach(async () => {
    const processingModel = {

    }
    const playlistService = {

    }
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        
        ProcessingService,
        { 
          provide: getModelToken(Processing.name),
          useValue: processingModel,
        },
        {
          provide: PlaylistService.name,
          useValue: playlistService,
        }
      ],
    }).compile();

    service = module.get<ProcessingService>(ProcessingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
