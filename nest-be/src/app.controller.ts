import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
const packageJSON = require('../package.json');

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
