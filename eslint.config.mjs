import cypress from 'eslint-plugin-cypress';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [...compat.extends('plugin:cypress/recommended'), {
    plugins: {
        cypress
    },

    languageOptions: {
        ecmaVersion: 2020,
        globals: {
            ...cypress.environments.globals.globals,
        },
    },

    ignores: ['**/node_modules/'],

    rules: {
        'cypress/no-assigning-return-values': 'error',
        'cypress/assertion-before-screenshot': 'off',
        'cypress/no-unnecessary-waiting': 'off',
        'cypress/no-async-tests': 'off',
        'cypress/no-pause': 'off',

        camelcase: [2, {
            properties: 'always',
            ignoreDestructuring: false,
            ignoreImports: false,
            ignoreGlobals: false,
        }],

        semi: ['error', 'always'],
        quotes: ['error', 'single'],
        indent: ['error', 4], 'max-len': ['error', 100]
    },
}];