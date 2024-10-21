import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/app/',
  plugins: [react()],
  server: {
    port: 5200,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8000', // Redirige las solicitudes que comienzan con /api hacia tu backend en Django
        changeOrigin: true, // Cambia el origen de la solicitud a la del backend
        secure: false, // Si estás utilizando HTTPS en local, pero el backend es HTTP, esto evita problemas
      },
    },
  },
});
