import {Command} from './command.interface.js';
import {TSVFileReader} from '../../shared/libs/file-reader/index.js';
import chalk from 'chalk';


export class ImportCommand implements Command {
  getName(): string {
    return '--import';
  }

  public async execute(...parameters: string[]): Promise<void> {
    const [filename] = parameters;
    const fileReader = new TSVFileReader(filename);
    const redText = chalk.hex('#c93a34');

    try {
      fileReader.read();
      console.log(fileReader.toArray());
    } catch (error) {
      if (!(error instanceof Error)) {
        throw error;
      }

      console.error(redText(`Can't import data from file: ${filename}`));
      console.error(redText(`Details: "${error.message}"`));
    }
  }
}
