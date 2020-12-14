import { Injectable } from '@nestjs/common';
import { Dirent, existsSync, mkdirSync } from 'fs';
import uniqid from 'uniqid';
import fs from 'fs/promises';

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
    const dirName = `${this.rootOutputDir}/${uniqid()}`;
    await fs.mkdir(dirName);
    return dirName;
  }
}
