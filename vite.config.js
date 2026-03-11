import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
base: '/pandawb/'
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})
