/**
 * vite.lib.config.ts
 *
 * Vite build config for publishing the DIWA UHRIS UI component library.
 * Run with: npm run build:lib
 *
 * Output: lib/
 *   index.mjs   — ES module build (tree-shakeable)
 *   index.cjs   — CommonJS build
 *   types/      — TypeScript declaration files (.d.ts)
 *
 * React and React DOM are declared as peer dependencies and NOT bundled —
 * the consuming project provides them.
 */

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    react(),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/ui-library/index.ts'),
      name: 'DiwaUhrisUI',
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format === 'es' ? 'mjs' : 'cjs'}`,
    },
    outDir: 'lib',
    // Don't clear the entire dist/ folder (that's the app build output)
    emptyOutDir: true,
    rollupOptions: {
      // Exclude these from the bundle — consumer projects provide them
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        '@radix-ui/react-dialog',
        '@radix-ui/react-popover',
        '@radix-ui/react-tooltip',
        'clsx',
        'tailwind-merge',
        'date-fns',
        'd3',
        'sonner',
        'react-calendar',
        'react-router-dom',
        'lucide-react',
      ],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'ReactJSXRuntime',
        },
        assetFileNames: 'assets/[name][extname]',
      },
    },
    // Exclude the app's public/ assets from the library output
    copyPublicDir: false,
    // Keep readable output — minification can be toggled on before publishing
    minify: false,
    sourcemap: false,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
});
