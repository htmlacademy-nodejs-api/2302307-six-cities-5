import {Command} from './command.interface.js';


export class ImportCommand implements Command {
  getName(): string {
    return '--import';
  }

  public async execute(..._parameters: string[]): Promise<void> {
    // TODO: Reading a file
  }
}
