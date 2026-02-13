import { exec, spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import { readFile, stat, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

import { detect, getCommand, getDefaultAgent } from '@antfu/ni';
import { createLogger } from '@lvksh/logger';
import chalk from 'chalk';
import prompts from 'prompts';

const Agents = ['npm', 'pnpm', 'yarn', 'bun', 'yarn@berry'] as const;
const ESLINT_CONFIG_FILE = 'eslint.config.mjs';
const PRETTIER_FILE = '.prettierrc';

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
    },
);

const noPackage = () => {
    log.empty('', '');
    log['💨'](chalk.redBright.bold`Oh no!`);
    log.empty(chalk.yellowBright('-'.repeat(40)));
    log.empty('It appears you are not in a project 🤷');
};

const findPackageJson = async (path: string) => {
    if (existsSync(join(path, 'package.json')))
        return join(path, 'package.json');

    if (path.length <= 1) return;

    return findPackageJson(join(path, '..'));
};

const setupESLintConfig = async () => {
    const exists = await stat(ESLINT_CONFIG_FILE).catch(() => false);

    if (exists) {
        log.empty(
            `Found existing ${chalk.gray(ESLINT_CONFIG_FILE)}, skipping...`,
        );

        return;
    }

    log.empty('Generating ' + chalk.gray`${ESLINT_CONFIG_FILE}`);

    const config = `import v3xlabs from 'eslint-plugin-v3xlabs';

export default [
    ...v3xlabs.configs['flat/recommended'],
];
`;

    await writeFile(ESLINT_CONFIG_FILE, config);
};

const setupPrettier = async () => {
    let mock: PrettierMock = {};

    const exists = await stat(PRETTIER_FILE).catch(() => false);

    if (exists) {
        log.empty(`Found existing ${chalk.gray(PRETTIER_FILE)}, modifying...`);

        const oldFile = await readFile(PRETTIER_FILE);

        mock = JSON.parse(oldFile.toString()) as PrettierMock;
    } else {
        log.empty('Generating ' + chalk.gray`${PRETTIER_FILE}`);
    }

    const BestData: PrettierMock = {
        ...mock,
        tabWidth: 4,
        useTabs: false,
        singleQuote: true,
    };

    // Write the updated/new file to disk
    await writeFile(PRETTIER_FILE, JSON.stringify(BestData, undefined, 4));
};

const setupPackageJSON = async (path: string) => {
    if (!path || path.length === 0) {
        log.empty(
            chalk.yellow`Skipped` +
                ' Setting up ' +
                chalk.gray`lint` +
                ' script.',
        );

        return;
    }

    log.empty('Setting up ' + chalk.gray`lint` + ' script...');
    const rawPackageData = await readFile(path);
    const packageData: { scripts?: { [key: string]: string } } = JSON.parse(
        rawPackageData.toString(),
    );

    const updatedPackageData = {
        ...packageData,
        scripts: {
            ...packageData.scripts,
            lint: 'eslint .',
        },
    };

    await writeFile(path, JSON.stringify(updatedPackageData, undefined, 4));
};

(async () => {
    log.empty('', '');

    log['⭐'](chalk.magenta`eslint-plugin-v3xlabs` + ' installer');
    log.empty(chalk.yellowBright('-'.repeat(40)));
    log.empty(
        'Authored by ' + chalk.gray`@v3xlabs`,
        'github.com/v3xlabs/eslint-v3xlabs',
        '',
    );

    await new Promise<void>((reply) => setTimeout(reply, 1000));

    log['🌿']('Relaxing....');
    log.empty(chalk.yellowBright('-'.repeat(40)));

    // Detect package manager
    const agent = await detect({ cwd: process.cwd() });
    let global = agent || (await getDefaultAgent());

    if (!agent && global === 'prompt') {
        global = (
            await prompts({
                name: 'agent',
                type: 'select',
                message: 'Choose the agent',
                choices: Agents.filter((index) => !index.includes('@')).map(
                    (value) => ({ title: value, value }),
                ),
            })
        ).agent;

        if (!global) return;
    } else {
        if (agent) {
            log.empty('Using project agent ' + chalk.gray(agent));
        } else {
            log.empty('Using default agent ' + chalk.gray(global));
        }
    }

    // Ensure package.json
    log.empty('Analyzing ' + chalk.gray`project settings`);
    const packageJSONLocation = await findPackageJson(process.cwd());

    log.empty(
        packageJSONLocation
            ? 'Looks good 👍'
            : 'Could not find project files 👀',
    );

    if (!packageJSONLocation) {
        noPackage();
        const shouldInit = (
            await prompts({
                name: 'init',
                type: 'confirm',
                message: 'Would you like to initialize one?',
            })
        ).init;

        if (shouldInit) {
            log.empty('Launching ' + global + ' to initialize project');
            log.empty('');
            await new Promise<void>((accept, _reject) => {
                const shell = spawn(global, ['init'], { stdio: 'inherit' });

                shell.on('error', (e) => {
                    console.log(e);
                });
                shell.on('close', (_code) => {
                    accept();
                });
            });
        } else {
            log.empty('Exiting create-eslint-v3xlabs');

            return;
        }
    }

    // Install dependencies
    log.empty('');
    log['🔧']('Building...');
    log.empty(chalk.yellowBright('-'.repeat(40)));

    log.empty('Switching to ' + chalk.gray(global));

    const packages = [
        'eslint',
        'eslint-plugin-v3xlabs',
        'typescript',
        'typescript-eslint',
    ];

    for (const packageToInstall of packages) {
        log.empty('Installing ' + chalk.gray(packageToInstall));
        await new Promise<boolean>((accept) => {
            const cmd =
                getCommand(global as (typeof Agents)[number], 'add') +
                ' -D ' +
                packageToInstall;

            exec(cmd, (error, stdout, stderr) => {
                if (error) {
                    log.empty(error);
                    log.empty(stderr);
                    log.empty(stdout);
                }

                accept(true);
            });
        });
    }

    log.empty();
    log['⚙️']('Configuring...');
    log.empty(chalk.yellowBright('-'.repeat(40)));

    await setupESLintConfig();
    await setupPrettier();
    await setupPackageJSON(packageJSONLocation);

    log.empty('');
    log.empty(chalk.yellowBright('-'.repeat(40)));
    log.empty('');
    log['🚀'](chalk.cyan`Off to the races!`);

    log.empty('', '');
})();
