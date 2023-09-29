import {Command} from './command.interface.js';
import {TSVFileReader} from '../../shared/libs/file-reader/index.js';
import chalk from 'chalk';
import {createOffer, getErrorMessage} from '../../shared/helpers/index.js';


export class ImportCommand implements Command {
  public getName(): string {
    return '--import';
  }

  public async execute(...parameters: string[]): Promise<void> {
    const [filename] = parameters;
    const fileReader = new TSVFileReader(filename);
    const redText = chalk.hex('#c93a34');

    fileReader.on('line', this.onImportedLine);
    fileReader.on('end', this.onCompleteImport);

    try {
      await fileReader.read();
    } catch (error) {
      console.error(redText(`Can't import data from file: ${filename}`));
      console.error(redText(getErrorMessage(error)));
    }
  }

  private onImportedLine(line: string): void {
    const offer = createOffer(line);
    console.info(offer);
  }

  private onCompleteImport(count: number): void {
    console.info(`${count} rows imported`);
  }
}
