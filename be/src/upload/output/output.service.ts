import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { existsSync, mkdirSync } from 'fs';
import { mkdir } from 'fs/promises';
import { VIDEOS_DIR } from '../../config';
import * as uniqid from 'uniqid';

@Injectable()
export class OutputService {
  private rootOutputDir: string;

  constructor() {
    this.rootOutputDir = VIDEOS_DIR;
    if (!existsSync(this.rootOutputDir)) {
      mkdirSync(this.rootOutputDir);
    }
  }

  async createOutputDir(uniqName: string = uniqid()): Promise<string> {
    try {
      const dirName = `${this.rootOutputDir}/${uniqName}`;
      await mkdir(dirName);
      return dirName;
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }
}
