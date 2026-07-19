/// <reference types="vitest/config" />
import { resolve } from 'node:path';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';
import dts from 'vite-plugin-dts';

export default defineConfig(() => {
  return {
    resolve: {
      tsconfigPaths: true,
    },
    plugins: [
      // Library build: type-check lib only (demo uses antd 5+ APIs).
      checker({
        typescript: {
          tsconfigPath: 'tsconfig.lib.json',
        },
      }),

      react(),

      // Generate TypeScript declaration files
      dts({
        insertTypesEntry: true,
        outDir: './dist', // Changed this to output to root directory
        include: ['lib'], // Specify the source directory to generate types from
        exclude: ['lib/**/__tests__/**', 'lib/**/*.{test,spec}.{ts,tsx}'],
      }),
    ],
    build: {
      lib: {
        // Main entry point of your library
        entry: resolve(__dirname, 'lib/index.ts'),

        // Set library name for UMD builds
        name: 'antd-form-composer',

        // Configure output filename format
        fileName: (format) => `index.${format}.js`,

        // Specify which formats to build
        // 'es' - for ESM (import/export)
        // 'umd' - for CommonJS and UMD
        formats: ['es', 'umd'],
      },
      rollupOptions: {
        // Mark React as external dependency
        external: ['react', 'react-dom', 'react/jsx-runtime', 'antd'],
        output: {
          globals: {
            react: 'React',
            'react-dom': 'ReactDOM',
            'react/jsx-runtime': 'jsxRuntime',
            antd: 'antd',
          },
        },
      },
    },
    test: {
      environment: 'jsdom',
      setupFiles: ['./lib/__tests__/setup.ts'],
      include: ['lib/**/*.{test,spec}.{ts,tsx}'],
    },
  };
});
