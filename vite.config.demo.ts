import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import monacoEditorPlugin from 'vite-plugin-monaco-editor';

const monacoPluginFactory =
  typeof monacoEditorPlugin === 'function'
    ? monacoEditorPlugin
    : (
        monacoEditorPlugin as unknown as {
          default: typeof monacoEditorPlugin;
        }
      ).default;

export default defineConfig({
  resolve: {
    tsconfigPaths: true,
  },
  plugins: [
    react(),
    monacoPluginFactory({
      languageWorkers: ['editorWorkerService', 'typescript'],
    }),
  ],
  build: {
    outDir: 'dist-demo',
    emptyOutDir: true,
  },
});
