import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [tailwindcss()],
  define: {
    global: {},
    'process.env': {},
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://epilogue.p-e.kr', // API 서버 주소
        changeOrigin: true, // 서버가 다른 도메인일 경우 CORS 문제를 해결
        rewrite: (path) => path.replace(/^\/api/, ''), // '/api'를 빈 문자열로 바꿔서 요청 전송
        secure: false, // SSL 인증서 검증을 하지 않음 (self-signed 인증서 사용 시)
        ws: true, // 웹소켓 지원
        followRedirects: true, // 리다이렉션을 따르도록 설정
      },
    },
  },
});
