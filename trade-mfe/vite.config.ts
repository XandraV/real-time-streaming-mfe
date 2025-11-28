import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "trade",
      filename: "remoteEntry.js",
      exposes: {
        "./TradeApp": "./src/App.tsx",
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
    port: 5002,
  },
  build: {
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
});
