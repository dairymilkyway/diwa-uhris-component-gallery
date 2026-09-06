/**
 * vite.css.config.ts
 *
 * CSS-only build step for the @diwauhris/ui package.
 * Compiles src/ui-library/ui.css through PostCSS (Tailwind + Autoprefixer)
 * and writes the result to lib/assets/ui.css.
 *
 * Run via: npm run build:css  (chained after build:lib)
 *
 * Strategy: use a tiny JS shim entry that imports the CSS file.
 * Vite processes the CSS through PostCSS, emits it as an asset, and we
 * discard the generated JS stub — only lib/assets/ui.css matters.
 */

import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  // Relative base so font URLs in ui.css resolve correctly from lib/assets/
  base: './',
  build: {
    outDir: 'lib',
    emptyOutDir: false,
    rollupOptions: {
      input: resolve(__dirname, 'src/ui-library/ui.css'),
      output: {
        // Asset files (the compiled CSS) land in lib/assets/
        assetFileNames: 'assets/[name][extname]',
      },
    },
    copyPublicDir: false,
    minify: false,
    // cssCodeSplit must be omitted (default true) so Vite emits the CSS as an asset
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
});
