import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
const packageJSON = {
  name: 'a',
  version: 'b'
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): any {
    return {
      name: packageJSON.name,
      version: packageJSON.version,
    };
  }
}
