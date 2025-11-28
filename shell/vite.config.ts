import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "shell",
      remotes: {
        portfolio: "http://localhost:5001/assets/remoteEntry.js",
        trade: "http://localhost:5002/assets/remoteEntry.js",
      },
      shared: {
        react: { version: false },
        "react-dom": { version: false },
        "react-redux": { version: false },
        "@reduxjs/toolkit": { version: false },
      },
    }),
  ],
  server: {
    port: 5000,
  },
  build: {
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
});
