import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import unpluginDefineOptions from 'unplugin-vue-define-options';
import CopyPlugin from "vite-plugin-files-copy"
const path = require('path');

function resolve(dir: string) {
  return path.join(__dirname, dir);
}

export default defineConfig({
  plugins: [
    vue(),
    unpluginDefineOptions.vite(),
    CopyPlugin({
      patterns: [
        {
          from: 'src/static',
          to: 'zyong-utils'
        }
      ]
    })
  ],
  build: {
    outDir: 'zyong-utils',
    lib: {
      entry: resolve("./src/components/zyong-utils/index.ts"),
      name: 'index',
      fileName: 'index'
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        globals: {
          vue: "Vue"
        }
      }
    },
  },
  resolve: {
    alias: {
      '@': resolve('./src')
    }
  },
  server: {
    port: 9088
  }
});
