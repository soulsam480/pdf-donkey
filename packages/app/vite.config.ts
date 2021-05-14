import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import tsconfigPaths from 'vite-tsconfig-paths';
import { VitePWA } from 'vite-plugin-pwa';
// https://vitejs.dev/config/
export default defineConfig({
  build: {
    sourcemap: false,
  },
  server: {
    port: 4001,
    open: true,
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
