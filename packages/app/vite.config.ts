import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 4001,
    open: true,
  },
  plugins: [reactRefresh(), tsconfigPaths()],
  resolve: {
    alias: {
      src: '/src',
    },
  },
});
