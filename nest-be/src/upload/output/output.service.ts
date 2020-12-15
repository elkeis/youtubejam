import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { existsSync, mkdirSync } from 'fs';
import { mkdir } from 'fs/promises';
import { VIDEOS_DIR } from '../../config';
const uniqid = require('uniqid');

@Injectable()
export class OutputService {
  
  private rootOutputDir: string;
  
  constructor(
  ) {
    this.rootOutputDir = VIDEOS_DIR;
    if (!existsSync(this.rootOutputDir)) {
      mkdirSync(this.rootOutputDir)
    }
  }

  async createOutputDir(): Promise<string> {
    try {
      const dirName = `${this.rootOutputDir}/${uniqid()}`;
      await mkdir(dirName);
      return dirName;
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }
}
