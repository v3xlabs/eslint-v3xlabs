import { createLogger } from '@lvksh/logger';
import chalk from 'chalk';
import { exec } from 'node:child_process';
import { existsSync } from 'node:fs';
import { readFile, stat, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

type ESLintMock = {
    parser?: string;
    parserOptions?: { ecmaVersion?: number };
    extends?: string[];
    ignorePatterns?: string[];
    plugins?: string[];
    env?: { node: boolean };
    rules?: {};
};

type PrettierMock = {
    tabWidth?: number;
    useTabs?: boolean;
    singleQuote?: boolean;
};

const log = createLogger(
    {
        '🚀': '🚀',
        '⚙️': '⚙️ ',
        '🔧': '🔧',
        '🌿': '🌿',
        '💨': '💨',
        '⭐': '⭐',
        empty: {
            label: '  ',
        },
    },
    {
        divider: ' ',
        newLine: '  ',
        newLineEnd: '  ',
        padding: 'NONE',
    }
);

const noPackage = () => {
    log.empty('', '');
    log['💨'](chalk.redBright.bold`Oh no!`);
    log.empty(chalk.yellowBright('-'.repeat(40)));
    log.empty(
        'It appears you are not in a project 🤷',
        'Try ' + chalk.gray`yarn init` + ' or ' + chalk.gray`npm init`,
        ''
    );
};

const findPackageJson = async (path: string) => {
    if (existsSync(join(path, 'package.json')))
        return join(path, 'package.json');

    if (path.length <= 1) return;

    return findPackageJson(join(path, '..'));
};

const setupESLintRC = async () => {
    let mock: ESLintMock = {};

    const exists = await stat('.eslintrc.json').catch(() => false);

    if (exists) {
        log.empty(
            `Found existing ${chalk.gray('.eslintrc.json')}, modifying...`
        );

        const oldFile = await readFile('.eslintrc.json');

        mock = JSON.parse(oldFile.toString()) as ESLintMock;
    } else {
        log.empty('Generating ' + chalk.gray`.eslintrc.json`);
    }

    const BestData: ESLintMock = {
        ...mock,
        parser: '@typescript-eslint/parser',
        parserOptions: { ecmaVersion: 2021 },
        extends: [
            ...new Set([...(mock.extends || []), 'plugin:lvksh/recommended']),
        ],
    };

    // Write the updated/new file to disk
    await writeFile('.eslintrc.json', JSON.stringify(BestData, undefined, 4));
};

const setupPrettier = async () => {
    let mock: PrettierMock = {};

    const exists = await stat('.prettierrc').catch(() => false);

    if (exists) {
        log.empty(`Found existing ${chalk.gray('.prettierrc')}, modifying...`);

        const oldFile = await readFile('.prettierrc');

        mock = JSON.parse(oldFile.toString()) as PrettierMock;
    } else {
        log.empty('Generating ' + chalk.gray`.prettierrc`);
    }

    const BestData: PrettierMock = {
        ...mock,
        tabWidth: 4,
        useTabs: false,
        singleQuote: true,
    };

    // Write the updated/new file to disk
    await writeFile('.prettierrc', JSON.stringify(BestData, undefined, 4));
};

const setupPackageJSON = async (path: string) => {
    if (!path || path.length === 0) {
        log.empty(
            chalk.yellow`Skipped` +
                ' Setting up ' +
                chalk.gray`lint` +
                ' script.'
        );

        return;
    }

    log.empty('Setting up ' + chalk.gray`lint` + ' script...');
    const rawPackageData = await readFile(path);
    const packageData: { scripts?: { [key: string]: string } } = JSON.parse(
        rawPackageData.toString()
    );

    const updatedPackageData = {
        ...packageData,
        scripts: {
            ...packageData.scripts,
            lint: 'eslint -c .eslintrc.json --ext .ts ./src',
        },
    };

    await writeFile(path, JSON.stringify(updatedPackageData, undefined, 4));
};

(async () => {
    log.empty(chalk.yellowBright('-'.repeat(40)));

    log['⭐'](
        chalk.magenta`eslint-plugin-lvksh` + ' installer',
        '',
        'Authored by @lvksh',
        'github.com/lvksh/javascript',
        ''
    );

    await new Promise<void>((reply) => setTimeout(reply, 1000));

    log['🌿']('Relaxing....');
    log.empty(chalk.yellowBright('-'.repeat(40)));

    log.empty('Analyzing ' + chalk.gray`project settings`);
    const packageJSONLocation = await findPackageJson(process.cwd());

    log.empty(
        packageJSONLocation
            ? 'Looks good 👍'
            : 'Could not find project files 👀'
    );

    if (!packageJSONLocation) {
        noPackage();

        return;
    }

    log.empty('');
    log['🔧']('Building...');
    log.empty(chalk.yellowBright('-'.repeat(40)));

    const packages = ['eslint', 'eslint-plugin-lvksh'];

    for (const packageToInstall of packages) {
        log.empty('Installing ' + chalk.gray(packageToInstall));
        await new Promise<boolean>((accept) =>
            exec('yarn add -D ' + packageToInstall, (error, stdout, stderr) => {
                // log.empty(stdout, stderr);
                accept(true);
            })
        );
    }

    log.empty();
    log['⚙️']('Configuring...');
    log.empty(chalk.yellowBright('-'.repeat(40)));

    await setupESLintRC();
    await setupPrettier();
    log.empty(chalk.yellowBright('-'.repeat(40)));
    await setupPackageJSON(packageJSONLocation);

    log.empty('');
    log['🚀'](chalk.cyan`Off to the races!`);

    log.empty('', '', '');
})();
