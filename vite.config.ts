import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@pages': '/src/pages',
      '@components': '/src/components',
      '@assets': '/src/assets',
      '@layout': '/src/layout',
      '@hooks': '/src/hooks',
      '@errorBoundary': '/src/ErrorBoundary',
      '@helpers': '/src/helpers',
      '@context': '/src/context',
      '@constant': '/src/constant'
    }
  }
})
