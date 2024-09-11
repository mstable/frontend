/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsConfigPaths from 'vite-tsconfig-paths';
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
import rollupNodePolyFill from 'rollup-plugin-node-polyfills';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  cacheDir: '../../node_modules/.vite/dhedge',

  server: {
    port: 4202,
    host: 'localhost',
    fs: {
      strict: false,
    },
  },

  preview: {
    port: 4302,
    host: 'localhost',
  },

  define: {
    'process.env': Object.entries(process.env).reduce(
      (acc, [key, value]) => ({
        ...acc,
        ...((key.startsWith('NX') || ['NODE_ENV'].includes(key)) && {
          [key]: value,
        }),
      }),
      {},
    ),
  },

  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'globalThis',
      },
      plugins: [
        NodeGlobalsPolyfillPlugin({
          process: true,
          buffer: true,
        }),
      ],
    },
  },

  build: {
    chunkSizeWarningLimit: 2500,
    rollupOptions: {
      plugins: [rollupNodePolyFill()],
    },
  },

  plugins: [
    svgr(),
    react(),
    viteTsConfigPaths({
      root: '../../',
      projects: ['tsconfig.base.json'],
    }),
  ],
});
