import {Command} from './command.interface.js';
import {MockServerData} from '../../shared/types/index.js';
import got from 'got';
import {TsvOfferGenerator} from '../../shared/libs/offer-generator/tsv-offer-generator.js';
import {TsvFileWriter} from '../../shared/libs/file-writer/index.js';
import {getErrorMessage} from '../../shared/helpers/index.js';

export class GenerateCommand implements Command {
  private initialData!: MockServerData;

  private async load(url: string): Promise<void> {
    try {
      this.initialData = await got.get(url).json();
    } catch {
      throw new Error(`Can't load data from ${url}`);
    }
  }

  private async write(filepath: string, offerCount: number): Promise<void> {
    const tsvOfferGenerator = new TsvOfferGenerator(this.initialData);
    const tsvFileWriter = new TsvFileWriter(filepath);

    for (let i = 0; i < offerCount; i++) {
      await tsvFileWriter.write(tsvOfferGenerator.generate());
    }
  }

  public getName(): string {
    return '--generate';
  }

  public async execute(...parameters: string[]): Promise<void> {
    const [count, filepath, url] = parameters;
    const offerCount = parseInt(count, 10);

    try {
      await this.load(url);
      await this.write(filepath, offerCount);
      console.info(`File ${filepath} was created!`);
    } catch (error: unknown) {
      console.error('Can\'t generate data');
      console.error(getErrorMessage(error));
    }
  }
}
