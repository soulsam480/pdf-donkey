import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3001,
    open: true,
  },
  plugins: [reactRefresh()],
  resolve: {
    alias: {
      src: './src',
    },
  },
});
