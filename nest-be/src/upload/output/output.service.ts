import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Dirent, existsSync, mkdirSync } from 'fs';
import { mkdir } from 'fs/promises';
const uniqid = require('uniqid');

const OUTPUT_DIR = './videos';

@Injectable()
export class OutputService {
  
  private rootOutputDir: string;
  
  constructor(
  ) {
    this.rootOutputDir = OUTPUT_DIR;
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
