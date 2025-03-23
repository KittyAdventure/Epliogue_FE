import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
export default defineConfig({
  plugins: [tailwindcss()],
  define: {
    global: {},
    'process.env': {},
  },
  // server: {
  //   proxy: {
  //     '/api': {
  //       target: 'https://epilogue.p-e.kr',
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace(/^\/api/, ''),
  //       secure: false,
  //       ws: true,
  //     },
  //   },
  // },
});
