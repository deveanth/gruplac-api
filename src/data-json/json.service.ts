import { Injectable } from '@nestjs/common';
import { promisify } from 'util';
import * as fs from 'fs';

@Injectable()
export class JsonService {
  private readonly writeFileAsync: (path: string, data: any) => Promise<void>;
  private readonly readFileAsync: (
    path: fs.PathLike | number,
  ) => Promise<string>;

  constructor() {
    this.writeFileAsync = promisify(fs.writeFile);
    this.readFileAsync = promisify(fs.readFile) as (
      path: fs.PathLike | number,
    ) => Promise<string>;
  }

  async generateJson(data: any, fileName: string) {
    const jsonData = JSON.stringify(data, null, 2);
    try {
      await this.writeFileAsync(fileName, jsonData);
      console.log('JSON saved successfully to', fileName);
      return data;
    } catch (err) {
      console.error('Error saving the JSON file:', err);
      return null;
    }
  }

  async readJson(fileName: string): Promise<any> {
    try {
      const jsonData = await this.readFileAsync(fileName);
      const parsedData = JSON.parse(jsonData);
      console.log('JSON read successfully from', fileName);
      return parsedData;
    } catch (err) {
      console.error('Error reading JSON file:', err.message);
      throw err;
    }
  }

  async jsonFileExists(fileName: string): Promise<boolean> {
    try {
      await this.readFileAsync(fileName);
      return true;
    } catch (err) {
      return false;
    }
  }
}
