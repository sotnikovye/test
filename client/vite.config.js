import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true, // Открывает доступ из внешней сети (0.0.0.0)
    port: 3000,
    allowedHosts: true,
    strictPort: false, // Если порт занят, Vite попробует следующий
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true
      }
    }
  }
})
