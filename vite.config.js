import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    proxy: {
      '/product/add': 'http:localhost:3000'
    }
  },
  plugins: [react()],
})