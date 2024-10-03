import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";

// 引入 connect-history-api-fallback 中介軟體
import history from 'connect-history-api-fallback';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    middlewareMode: 'html', // 使用中介軟體模式
    setupMiddlewares(middlewares) {
      // 添加中介軟體
      middlewares.push(
        history({
          disableDotRule: true,
          htmlAcceptHeaders: ['text/html', 'application/xhtml+xml'],
        })
      );
      return middlewares;
    },
  },
});
