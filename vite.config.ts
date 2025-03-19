import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
export default defineConfig({
  plugins: [tailwindcss()],
  define: {
    global: {},
    'process.env': {},
  },
  server: {
    port: 5174,
  },
});
