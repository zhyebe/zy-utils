import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import unpluginDefineOptions from 'unplugin-vue-define-options';
const path = require('path');

function resolve(dir: string) {
  return path.join(__dirname, dir);
}

export default defineConfig({
  plugins: [
    vue(),
    unpluginDefineOptions.vite()
  ],
  build: {
    outDir: 'zy-utils',
    lib: {
      entry: resolve("./src/components/zy-utils/index.ts"),
      name: 'zy-utils',
      fileName: 'zy-utils'
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        globals: {
          vue: "Vue"
        }
      }
    }
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
