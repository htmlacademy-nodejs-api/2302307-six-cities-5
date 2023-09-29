import {Command} from './command.interface.js';
import chalk from 'chalk';

export class HelpCommand implements Command {
  public getName(): string {
    return '--help';
  }

  public execute(..._parameters: string[]): void {
    const pinkText = chalk.hex('#ff59b5');
    const orangeText = chalk.hex('#ff9f3d');
    const greyText = chalk.hex('#979496');

    console.info(`
        ${chalk.underline('Программа для подготовки данных для REST API сервера.')}
        Пример:
            ${chalk.italic('main.cli.js')} ${pinkText('--<command>')} ${orangeText('[--arguments]')}
        Команды:
            ${pinkText('--version')}:                    ${greyText('# выводит номер версии')}
            ${pinkText('--help')}:                       ${greyText('# печатает этот текст')}
            ${pinkText('--import')} ${orangeText('<path>')}:              ${greyText('# импортирует данные из TSV')}
            ${pinkText('--generate')} ${orangeText('<n> <path> <url>')}:  ${greyText('# генерирует произвольное количество тестовых данных')}
    `);
  }
}
