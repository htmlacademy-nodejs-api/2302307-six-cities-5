import {FileReader} from './file-reader.interface.js';
import {readFileSync} from 'node:fs';


export class TSVFileReader implements FileReader {
  private rawData: string = '';

  constructor(
    private readonly filename: string
  ) {
  }

  public read(): void {
    this.rawData = readFileSync(this.filename, {encoding: 'utf-8'});
  }
}
