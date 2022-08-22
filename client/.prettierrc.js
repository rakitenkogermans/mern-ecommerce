module.exports = {
    singleQuote: true,
    printWidth: 100,
    proseWrap: 'always',
    tabWidth: 4,
    useTabs: false,
    trailingComma: 'es5',
    bracketSpacing: false,
    jsxBracketSameLine: false,
    semi: true,
    arrowParens: 'always',
    endOfLine: 'lf',
    overrides: [
        {
            files: ['*.ts'],
            options: {
                parser: 'typescript',
            },
        },
        {
            files: ['*.tsx'],
            options: {
                parser: 'typescript',
                jsxBracketSameLine: false,
                jsxSingleQuote: false,
            },
        },
        {
            files: ['*.json'],
            options: {
                parser: 'json',
            },
        },
    ],
};
