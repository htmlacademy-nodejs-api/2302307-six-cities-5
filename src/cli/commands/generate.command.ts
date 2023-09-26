import {Command} from './command.interface.js';

export class GenerateCommand implements Command {
  public getName(): string {
    return '--generate';
  }

  public execute(...parameters: string[]): void {
    const [count, filepath, url] = parameters;
    const offerCount = parseInt(count, 10);

    // TODO: Getting data from server [WIP]
  }
}
