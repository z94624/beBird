import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

import AutoImport from 'unplugin-auto-import/vite';
import eslintPlugin from 'vite-plugin-eslint';
import Components from 'unplugin-vue-components/vite';
import { QuasarResolver } from 'unplugin-vue-components/resolvers';

import { quasar, transformAssetUrls } from '@quasar/vite-plugin';

import { fileURLToPath, URL } from 'node:url';

// https://vitejs.dev/config/
export default defineConfig({
    base: '/beBird',
    resolve: {
        alias: [
            { find: '@', replacement: fileURLToPath(new URL('./src', import.meta.url)) },
            {
                find: '@assets',
                replacement: fileURLToPath(new URL('./src/assets', import.meta.url)),
            },
            { find: '@cmp', replacement: fileURLToPath(new URL('./src/cmp', import.meta.url)) },
            {
                find: '@stores',
                replacement: fileURLToPath(new URL('./src/stores', import.meta.url)),
            },
            { find: '@use', replacement: fileURLToPath(new URL('./src/use', import.meta.url)) },
        ],
    },
    plugins: [
        vue({
            template: { transformAssetUrls },
        }),
        // @quasar/plugin-vite options list:
        // https://github.com/quasarframework/quasar/blob/dev/vite-plugin/index.d.ts
        quasar({
            sassVariables: 'src/quasar-variables.sass',
        }),
        AutoImport({
            // targets to transform
            include: [
                /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
                /\.vue$/,
                /\.vue\?vue/, // .vue
                /\.md$/, // .md
            ],

            // global imports to register
            imports: [
                // presets
                'vue',
                'vue-router',
                'vuex',
                // custom
                {
                    '@vueuse/core': [
                        // named imports
                        'useMouse', // import { useMouse } from '@vueuse/core',
                        // alias
                        ['useFetch', 'useMyFetch'], // import { useFetch as useMyFetch } from '@vueuse/core',
                    ],
                    axios: [
                        // default imports
                        ['default', 'axios'], // import { default as axios } from 'axios',
                    ],
                    '[package-name]': [
                        '[import-names]',
                        // alias
                        ['[from]', '[alias]'],
                    ],
                },
                // example type import
                {
                    from: 'vue-router',
                    imports: ['RouteLocationRaw'],
                    type: true,
                },
            ],

            // Array of strings of regexes that contains imports meant to be filtered out.
            ignore: ['useMouse', 'useFetch'],

            // Enable auto import by filename for default module exports under directories
            defaultExportByFilename: false,

            // Auto import for module exports under directories
            // by default it only scan one level of modules under the directory
            dirs: [
                // './hooks',
                // './composables' // only root modules
                // './composables/**', // all nested modules
                // ...
            ],

            // Filepath to generate corresponding .d.ts file.
            // Defaults to './auto-imports.d.ts' when `typescript` is installed locally.
            // Set `false` to disable.
            dts: './auto-imports.d.ts',

            // Array of strings of regexes that contains imports meant to be ignored during
            // the declaration file generation. You may find this useful when you need to provide
            // a custom signature for a function.
            ignoreDts: ['ignoredFunction', /^ignore_/],

            // Auto import inside Vue template
            // see https://github.com/unjs/unimport/pull/15 and https://github.com/unjs/unimport/pull/72
            vueTemplate: false,

            // Custom resolvers, compatible with `unplugin-vue-components`
            // see https://github.com/antfu/unplugin-auto-import/pull/23/
            resolvers: [
                /* ... */
            ],

            // Inject the imports at the end of other imports
            injectAtEnd: true,

            // Generate corresponding .eslintrc-auto-import.json file.
            // eslint globals Docs - https://eslint.org/docs/user-guide/configuring/language-options#specifying-globals
            eslintrc: {
                enabled: false, // Default `false`
                filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
                globalsPropValue: true, // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
            },
        }),
        eslintPlugin({ cache: false }),
        Components({
            dirs: ['src/components'], // 指定components位置 預設是'src/components'
            dts: './components.d.ts', // .d.ts生成位置
            resolvers: [QuasarResolver()], // 解析規則
        }),
    ],
});
