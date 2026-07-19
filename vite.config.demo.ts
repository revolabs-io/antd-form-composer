import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import monacoEditorPlugin from 'vite-plugin-monaco-editor';
import tsconfigPaths from 'vite-tsconfig-paths';

const monacoPluginFactory =
  typeof monacoEditorPlugin === 'function'
    ? monacoEditorPlugin
    : (
        monacoEditorPlugin as unknown as {
          default: typeof monacoEditorPlugin;
        }
      ).default;

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    monacoPluginFactory({
      languageWorkers: ['editorWorkerService', 'typescript'],
    }),
  ],
  build: {
    outDir: 'dist-demo',
    emptyOutDir: true,
  },
});
