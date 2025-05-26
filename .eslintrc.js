// .eslintrc.js 예시
module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: ['@typescript-eslint'],
    extends: [
        'plugin:@typescript-eslint/recommended',
        'next/core-web-vitals'
    ],
    rules: {
        '@typescript-eslint/no-explicit-any': 'warn',
        '@typescript-eslint/no-unused-vars': 'warn',
        '@typescript-eslint/no-empty-interface': 'off',
    },
    overrides: [
        {
            files: ['node_modules/@prisma/client/**', 'prisma/generated/**'],
            rules: {
                '@typescript-eslint/no-explicit-any': 'off',
                '@typescript-eslint/no-unused-vars': 'off',
            },
        },
    ],

};
