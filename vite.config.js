import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
export default defineConfig({
  plugins: [react()],
  server: {
    // port: 5173,
    proxy: {
      "/api": {
        // Replace '/api' with the base path of your API
        target: "http://pocapi.researchpick.com", // Replace with your backend URL
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  commonjsOptions: {
    esmExternals: true,
  },
});
