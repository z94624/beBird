module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    extends: [
        './.eslintrc-auto-import.json', // `unplugin-auto-import` 生成的規則設定
        'eslint:recommended',
        'plugin:vue/vue3-essential',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
        'prettier',
    ],
    overrides: [
        {
            env: {
                node: true,
            },
            files: ['.eslintrc.{js,cjs}'],
            parserOptions: {
                sourceType: 'script',
            },
            rules: {
                'vue/multi-word-component-names': 'off',
                'vue/component-name-in-template-casing': 'off',
                'vue/singleline-html-element-content-newline': 'off',
                '@typescript-eslint/no-var-requires': 'off',
                'no-console': 'off',
                'brace-style': 'off',
                'operator-linebreak': 'off',
                'vue/operator-linebreak': 'off',
                'require-await': 'off',
                'vue/html-indent': 'off',
            },
        },
    ],
    parser: 'vue-eslint-parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        parser: '@typescript-eslint/parser',
    },
    plugins: ['@typescript-eslint', 'vue', 'prettier'],
    rules: {
        '@typescript-eslint/ban-types': [
            // 關閉錯誤(error)：不要以 {} 當作一個類型
            'error',
            {
                extendDefaults: true,
                types: {
                    '{}': false,
                },
            },
        ],
        '@typescript-eslint/no-explicit-any': ['off'], // 關閉警告(warning)：不允許使用 any
        'prettier/prettier': [
            'error',
            {
                endOfLine: 'auto',
            },
        ],
    },
};
