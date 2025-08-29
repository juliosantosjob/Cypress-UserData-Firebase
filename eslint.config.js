const pluginCypress = require("eslint-plugin-cypress");

module.exports = [
    {
        plugins: {
            cypress: pluginCypress,
        },
        languageOptions: {
            ecmaVersion: 2020,
        },
        ignores: [
            "node_modules/**",
            "allure-results/**",
            "allure-report/**",
            "eslint.config.js",
        ],
        rules: {
            "cypress/unsafe-to-chain-command": "error",
            "cypress/no-assigning-return-values": "error",
            "cypress/no-unnecessary-waiting": "error",
            "cypress/no-async-tests": "error",
            "cypress/no-pause": "off",
            "cypress/no-force": "off",
            camelcase: [
                "error",
                {
                    properties: "always",
                    ignoreDestructuring: false,
                    ignoreImports: false,
                    ignoreGlobals: false,
                },
            ],
            semi: ["error", "always"],
            quotes: ["error", "double"],
            indent: ["error", 4],
            "max-len": ["error", 100],
            "no-trailing-spaces": "error",
            "no-multi-spaces": "error",
            "spaced-comment": ["error", "always"],
        },
    },
];