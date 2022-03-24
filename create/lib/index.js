"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ni_1 = require("@antfu/ni");
const logger_1 = require("@lvksh/logger");
const chalk_1 = __importDefault(require("chalk"));
const node_child_process_1 = require("node:child_process");
const node_fs_1 = require("node:fs");
const promises_1 = require("node:fs/promises");
const node_path_1 = require("node:path");
const prompts_1 = __importDefault(require("prompts"));
const Agents = ['npm', 'pnpm', 'yarn', 'yarn@berry'];
const log = (0, logger_1.createLogger)({
    '🚀': '🚀',
    '⚙️': '⚙️ ',
    '🔧': '🔧',
    '🌿': '🌿',
    '💨': '💨',
    '⭐': '⭐',
    empty: {
        label: '  ',
    },
}, {
    divider: ' ',
    newLine: '  ',
    newLineEnd: '  ',
    padding: 'NONE',
});
const noPackage = () => {
    log.empty('', '');
    log['💨'](chalk_1.default.redBright.bold `Oh no!`);
    log.empty(chalk_1.default.yellowBright('-'.repeat(40)));
    log.empty('It appears you are not in a project 🤷');
};
const findPackageJson = (path) => __awaiter(void 0, void 0, void 0, function* () {
    if ((0, node_fs_1.existsSync)((0, node_path_1.join)(path, 'package.json')))
        return (0, node_path_1.join)(path, 'package.json');
    if (path.length <= 1)
        return;
    return findPackageJson((0, node_path_1.join)(path, '..'));
});
const setupESLintRC = () => __awaiter(void 0, void 0, void 0, function* () {
    let mock = {};
    const exists = yield (0, promises_1.stat)('.eslintrc.json').catch(() => false);
    if (exists) {
        log.empty(`Found existing ${chalk_1.default.gray('.eslintrc.json')}, modifying...`);
        const oldFile = yield (0, promises_1.readFile)('.eslintrc.json');
        mock = JSON.parse(oldFile.toString());
    }
    else {
        log.empty('Generating ' + chalk_1.default.gray `.eslintrc.json`);
    }
    const updatedLint = Object.assign(Object.assign({}, mock), { parser: '@typescript-eslint/parser', parserOptions: { ecmaVersion: 2021 }, extends: [
            ...new Set([...(mock.extends || []), 'plugin:lvksh/recommended']),
        ], ignorePatterns: ['!**/*'], plugins: [...new Set([...(mock.plugins || []), 'lvksh'])], env: {
            node: true,
        }, rules: Object.assign({}, (mock.rules || [])) });
    // Write the updated/new file to disk
    yield (0, promises_1.writeFile)('.eslintrc.json', JSON.stringify(updatedLint, undefined, 4));
});
const setupPrettier = () => __awaiter(void 0, void 0, void 0, function* () {
    let mock = {};
    const exists = yield (0, promises_1.stat)('.prettierrc').catch(() => false);
    if (exists) {
        log.empty(`Found existing ${chalk_1.default.gray('.prettierrc')}, modifying...`);
        const oldFile = yield (0, promises_1.readFile)('.prettierrc');
        mock = JSON.parse(oldFile.toString());
    }
    else {
        log.empty('Generating ' + chalk_1.default.gray `.prettierrc`);
    }
    const BestData = Object.assign(Object.assign({}, mock), { tabWidth: 4, useTabs: false, singleQuote: true });
    // Write the updated/new file to disk
    yield (0, promises_1.writeFile)('.prettierrc', JSON.stringify(BestData, undefined, 4));
});
const setupPackageJSON = (path) => __awaiter(void 0, void 0, void 0, function* () {
    if (!path || path.length === 0) {
        log.empty(chalk_1.default.yellow `Skipped` +
            ' Setting up ' +
            chalk_1.default.gray `lint` +
            ' script.');
        return;
    }
    log.empty('Setting up ' + chalk_1.default.gray `lint` + ' script...');
    const rawPackageData = yield (0, promises_1.readFile)(path);
    const packageData = JSON.parse(rawPackageData.toString());
    const updatedPackageData = Object.assign(Object.assign({}, packageData), { scripts: Object.assign(Object.assign({}, packageData.scripts), { lint: 'eslint -c .eslintrc.json --ext .ts ./src' }) });
    yield (0, promises_1.writeFile)(path, JSON.stringify(updatedPackageData, undefined, 4));
});
(() => __awaiter(void 0, void 0, void 0, function* () {
    log.empty('', '');
    log['⭐'](chalk_1.default.magenta `eslint-plugin-lvksh` + ' installer');
    log.empty(chalk_1.default.yellowBright('-'.repeat(40)));
    log.empty('Authored by ' + chalk_1.default.gray `@lvksh`, 'github.com/lvksh/javascript', '');
    yield new Promise((reply) => setTimeout(reply, 1000));
    log['🌿']('Relaxing....');
    log.empty(chalk_1.default.yellowBright('-'.repeat(40)));
    // Detect package manager
    const agent = yield (0, ni_1.detect)({ cwd: process.cwd() });
    let global = agent || (yield (0, ni_1.getDefaultAgent)());
    if (!agent && global === 'prompt') {
        global = (yield (0, prompts_1.default)({
            name: 'agent',
            type: 'select',
            message: 'Choose the agent',
            choices: Agents.filter((index) => !index.includes('@')).map((value) => ({ title: value, value })),
        })).agent;
        if (!global)
            return;
    }
    else {
        if (agent) {
            log.empty('Using project agent ' + chalk_1.default.gray(agent));
        }
        else {
            log.empty('Using default agent ' + chalk_1.default.gray(global));
        }
    }
    // Ensure package.json
    log.empty('Analyzing ' + chalk_1.default.gray `project settings`);
    const packageJSONLocation = yield findPackageJson(process.cwd());
    log.empty(packageJSONLocation
        ? 'Looks good 👍'
        : 'Could not find project files 👀');
    if (!packageJSONLocation) {
        noPackage();
        const shouldInit = (yield (0, prompts_1.default)({
            name: 'init',
            type: 'confirm',
            message: 'Would you like to initialize one?',
        })).init;
        if (shouldInit) {
            log.empty('Launching ' + global + ' to initialize project');
            log.empty('');
            yield new Promise((accept, reject) => {
                const shell = (0, node_child_process_1.spawn)(global, ['init'], { stdio: 'inherit' });
                shell.on('error', (e) => {
                    console.log(e);
                });
                shell.on('close', (code) => {
                    accept();
                });
            });
        }
        else {
            log.empty('Exiting create-eslint-lvksh');
            return;
        }
    }
    // Install dependencies
    log.empty('');
    log['🔧']('Building...');
    log.empty(chalk_1.default.yellowBright('-'.repeat(40)));
    log.empty('Switching to ' + chalk_1.default.gray(global));
    const packages = [
        'eslint',
        'eslint-plugin-lvksh',
        'typescript',
        '@typescript-eslint/parser',
    ];
    for (const packageToInstall of packages) {
        log.empty('Installing ' + chalk_1.default.gray(packageToInstall));
        yield new Promise((accept) => {
            const cmd = (0, ni_1.getCommand)(global, 'install') + ' -D ' + packageToInstall;
            (0, node_child_process_1.exec)(cmd, (error, stdout, stderr) => {
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
    log.empty(chalk_1.default.yellowBright('-'.repeat(40)));
    yield setupESLintRC();
    yield setupPrettier();
    yield setupPackageJSON(packageJSONLocation);
    log.empty('');
    log.empty(chalk_1.default.yellowBright('-'.repeat(40)));
    log.empty('');
    log['🚀'](chalk_1.default.cyan `Off to the races!`);
    log.empty('', '');
}))();
