#!/usr/bin/env node

import chalk from 'chalk';
import { program } from 'commander';
import shell from 'shelljs';

// Define CLI commands
program
  .name('nexa')
  .description('Nexa CLI tool')
  .version('1.0.0');

program
  .command('start')
  .description('Run node index.js')
  .action(() => {
    console.log(chalk.green('Starting application...'));
    shell.exec('node index.js');
  });

program
  .command('dev')
  .description('Run nodemon with file watching')
  .action(() => {
    console.log(chalk.blue('Starting in development mode...'));
    shell.exec("nodemon -L index.js --watch '**/*'");
  });

program
  .command('test')
  .description('Run tests')
  .action(() => {
    console.log(chalk.blue('Start testing...'));
    shell.exec('node index.js --test', { async: true });
  });

program.parse(process.argv);
