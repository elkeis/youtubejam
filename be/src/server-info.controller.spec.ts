import { Test, TestingModule } from '@nestjs/testing';
import { ServerInfoController } from './server-info.controller';
import * as packageJSON from '../package.json';

describe('ServerInfoController', () => {
  let serverInfoController: ServerInfoController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ServerInfoController],
    }).compile();

    serverInfoController = app.get<ServerInfoController>(ServerInfoController);
  });

  describe('root', () => {
    it('should return app info', () => {
      expect(serverInfoController.getInfo()).toEqual({
        name: packageJSON.name,
        version: packageJSON.version,
      });
    });
  });
});
