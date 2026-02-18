import { defineConfig } from 'vite'

export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        loadPaths: [
          './src/scss'
        ],
      },
    },
  },
  build: {
    outDir: 'dist',  // папка для сборки
    emptyOutDir: true,  // очищать папку перед сборкой
    minify: true,  // минификация кода
    sourcemap: false,  // отключить sourcemaps в продакшене
  },
  base: '/weblarek/',  // путь для GitHub Pages
})