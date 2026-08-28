import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
    site: 'https://deptrai.de',
    base: '/',
    integrations: [sitemap()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    // Keep legacy Sass APIs until a full @use/@forward migration.
                    silenceDeprecations: ['import', 'global-builtin'],
                },
            },
        },
    },
});
