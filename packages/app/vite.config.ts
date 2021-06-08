import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import tsconfigPaths from 'vite-tsconfig-paths';
import { VitePWA } from 'vite-plugin-pwa';
import { dependencies } from './package.json';
function renderChunks(deps: Record<string, string>) {
  let chunks = {};
  Object.keys(deps).forEach((key) => {
    if (['react', 'react-router-dom', 'react-dom'].includes(key)) return;
    chunks[key] = [key];
  });
  return chunks;
}
// https://vitejs.dev/config/
export default defineConfig({
  build: {
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-router-dom', 'react-dom'],
          ...renderChunks(dependencies),
        },
      },
    },
  },
  server: {
    port: 4001,
    open: false,
  },
  plugins: [
    reactRefresh(),
    tsconfigPaths(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'inline',
      strategies: 'generateSW',
      workbox: {
        globIgnores: ['_redirects'],
        skipWaiting: true,
        clientsClaim: true,
        sourcemap: false,
      },
      manifest: {
        scope: '.',
        name: 'PDF Donkey',
        short_name: 'PDF Donkey',
        description: 'Open source on demand pdf generation.',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#e2f3f5',
        theme_color: '#22d1ee',
        icons: [
          {
            src: '/icon.png',
            sizes: '96x96',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      src: '/src',
    },
  },
});
