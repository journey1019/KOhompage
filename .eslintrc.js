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
    },
};
