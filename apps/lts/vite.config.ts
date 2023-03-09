/* eslint-disable new-cap */
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
import react from '@vitejs/plugin-react';
import rollupNodePolyFill from 'rollup-plugin-node-polyfills';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';
import viteTsConfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  cacheDir: '../../node_modules/.vite/lts',

  server: {
    port: 4201,
    host: 'localhost',
    fs: {
      strict: false,
    },
  },

  preview: {
    port: 4301,
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
