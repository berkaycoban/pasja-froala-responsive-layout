import path from 'path'
import { fileURLToPath, URL } from 'url'

import { defineConfig, UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const isBuildWebsite = process.env.TYPE === 'website'

const config = {
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
} as UserConfig

if (!isBuildWebsite)
  config.build = {
    lib: {
      entry: path.resolve(__dirname, 'src/install.ts'),
      name: 'pasja-froala-responsive-layout',
      fileName: format => `pasja.${format}.js`
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['vue'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: 'Vue'
        }
      }
    }
  }

// https://vitejs.dev/config/
export default defineConfig(config)
