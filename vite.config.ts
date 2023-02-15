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
          to: 'lxhby-utils'
        }
      ]
    })
  ],
  build: {
    outDir: 'lxhby-utils',
    lib: {
      entry: resolve("./src/components/lxhby-utils/index.ts"),
      name: 'lxhby-utils',
      fileName: 'lxhby-utils'
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
