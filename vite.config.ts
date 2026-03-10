import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "SÕEL — Daily Digest",
        short_name: "SÕEL",
        description: "AI-curated daily digest of the best articles",
        theme_color: "#1A1A2E",
        background_color: "#F5F3EE",
        display: "standalone",
        icons: [
          { src: "/soel-icon-192.svg", sizes: "192x192", type: "image/svg+xml" },
          { src: "/soel-icon-512.svg", sizes: "512x512", type: "image/svg+xml" },
        ],
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /sheets\.googleapis\.com/,
            handler: "NetworkFirst",
            options: { cacheName: "sheets-data", expiration: { maxAgeSeconds: 3600 } },
          },
          {
            urlPattern: /fonts\.googleapis\.com/,
            handler: "CacheFirst",
            options: { cacheName: "google-fonts", expiration: { maxAgeSeconds: 31536000 } },
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: { "@": "/src" },
  },
});
