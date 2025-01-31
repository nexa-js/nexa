#!/usr/bin/env node

import chalk from 'chalk';
import { program } from 'commander';
import inquirer from 'inquirer';
import shell from 'shelljs';
import path from 'path';
import degit from 'degit';

program
  .version('1.0.0')
  .description('A CLI tool to set up your project using @nexa-js/nexa-starter')
  .argument('[project-name]', 'Name of the project')
  .action(async (projectName) => {
    if (!projectName) {
      const { name } = await inquirer.prompt([
        {
          type: 'input',
          name: 'name',
          message: 'What is the name of your project?',
        },
      ]);
      projectName = name;
    }

    console.log(chalk.green(`Creating project: ${projectName}`));

    // Create project directory
    if (shell.mkdir(projectName).code !== 0) {
      console.error(chalk.red('Failed to create project directory'));
      process.exit(1);
    }

    // Navigate into the project directory
    shell.cd(projectName);

    // Use degit to download only the nexa-starter folder
    console.log(chalk.blue('Downloading starter template...'));
    try {
      const emitter = degit('nexa-js/nexa/packages/nexa-starter', {
        cache: false,
        force: true,
      });

      await emitter.clone(path.resolve(process.cwd()));

      console.log(chalk.green('Starter template downloaded successfully!'));
    } catch (err) {
      console.error(chalk.red('Failed to download starter template:', err));
      process.exit(1);
    }

    // Ask the user to choose between yarn and npm
    const { packageManager } = await inquirer.prompt([
      {
        type: 'list',
        name: 'packageManager',
        message: 'Which package manager do you want to use?',
        choices: ['yarn', 'npm'],
      },
    ]);

    // Install dependencies
    console.log(chalk.blue('Installing dependencies...'));
    if (packageManager === 'yarn') {
      shell.exec('yarn install');
    } else {
      shell.exec('npm install');
    }

    console.log(chalk.green('Project setup complete!'));
    console.log(chalk.blue(`Run the following commands to start your project:`));
    console.log(chalk.cyan(`cd ${projectName}`));
    console.log(chalk.cyan(`${packageManager === 'yarn' ? 'yarn dev' : 'npm run dev'}`));
  });

program.parse(process.argv);