import {readFileSync} from 'node:fs';
import {resolve} from 'node:path';
import {Command} from './command.interface.js';
import chalk from 'chalk';

type PackageJSONConfig = {
  version: string;
}

function isPackageJSONConfig(value: unknown): value is PackageJSONConfig {
  return (
    typeof value === 'object' &&
    value !== null &&
    !Array.isArray(value) &&
    Object.hasOwn(value, 'version')
  );
}

export class VersionCommand implements Command {
  constructor(
    private readonly filePath: string = './package.json'
  ) {
  }

  private readVersion(): string {
    const jsonContent = readFileSync(resolve(this.filePath), {encoding: 'utf-8'});
    const importedContent: unknown = JSON.parse(jsonContent);

    if (!isPackageJSONConfig(importedContent)) {
      throw new Error('Failed to parse JSON content');
    }

    return importedContent.version;
  }

  public getName(): string {
    return '--version';
  }

  public execute(..._parameters: string[]): void {
    const redText = chalk.hex('#c93a34');

    try {
      const version = this.readVersion();
      console.info(version);
    } catch (error: unknown) {
      console.error(redText(`Failed to read version from ${this.filePath}`));

      if (error instanceof Error) {
        console.error(redText(error.message));
      }
    }
  }
}
