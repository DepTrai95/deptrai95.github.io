import { defineConfig } from 'astro/config';
import transition from '@astrojs/transition';

// https://astro.build/config
export default defineConfig({
  site: 'https://deptrai95.github.io',
  base: '/',
  integrations: [transition()],
});
