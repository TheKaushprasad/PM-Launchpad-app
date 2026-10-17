import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // "@/" points at the repo root, so shadcn/ui imports like "@/components/ui/button" resolve.
  resolve: {
    alias: { '@': path.resolve(__dirname, '.') },
  },
  server: {
    host: '0.0.0.0',
    port: 3000,
    strictPort: true,
  },
})