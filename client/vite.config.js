import path from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import content from '@originjs/vite-plugin-content';
import { VitePluginNode } from 'vite-plugin-node';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: `${path.resolve(__dirname, '../', 'server/', 'public')}/`
  },
  server: {
    proxy: {
      '/gti525': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false,
        ws: true,
      }
    },
  },
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
    })
  ]
});
