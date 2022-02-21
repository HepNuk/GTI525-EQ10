import path from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import content from '@originjs/vite-plugin-content';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
      'src/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
  plugins: [
    vue(),
    content({
      csv: {
        enabled: true,
        csvOptions: {
          group_columns_by_name: true,
          columns: true,
          cast: true
        }
      }
    }),
  ],
  base: '',
});
