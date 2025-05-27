import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react', '@google-cloud/vertexai'],
  },
  build: {
    rollupOptions: {
      external: ['@google-cloud/vertexai']
    }
  },
  define: {
    process: { env: {} },
  },
});