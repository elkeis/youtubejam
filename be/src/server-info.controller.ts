import { Controller, Get } from '@nestjs/common';
import * as packageJSON from '../package.json';

@Controller('info')
export class ServerInfoController {
  @Get()
  getInfo(): {
    name: string;
    version: string;
  } {
    return {
      name: packageJSON.name,
      version: packageJSON.version,
    };
  }
}
