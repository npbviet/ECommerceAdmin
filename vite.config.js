import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "./",
  server: {
    port: 3001, // Đặt cổng chạy ứng dụng
    host: "localhost", // Cho phép truy cập nội bộ
  },
});
