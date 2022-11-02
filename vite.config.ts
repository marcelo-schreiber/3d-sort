import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
// https://vitejs.dev/config/

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: { enabled: true },
      includeAssets: ["favicon.ico", "apple-touch-icon.png", "masked-icon.svg"],
      manifest: {
        name: "3d sort | Visualize ordenação em 3d",
        short_name: "3dsort",
        theme_color: "#4c2e71",
        background_color: "#F1F9F5",
        icons: [
          {
            src: "/assets/icon-72x72.png",
            sizes: "72x72",
            type: "image/png",
            purpose: "maskable any",
          },
          {
            src: "/assets/icon-96x96.png",
            sizes: "96x96",
            type: "image/png",
            purpose: "maskable any",
          },
          {
            src: "/assets/icon-128x128.png",
            sizes: "128x128",
            type: "image/png",
            purpose: "maskable any",
          },
          {
            src: "/assets/icon-144x144.png",
            sizes: "144x144",
            type: "image/png",
            purpose: "maskable any",
          },
          {
            src: "/assets/icon-152x152.png",
            sizes: "152x152",
            type: "image/png",
            purpose: "maskable any",
          },
          {
            src: "/assets/icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "maskable any",
          },
          {
            src: "/assets/icon-384x384.png",
            sizes: "384x384",
            type: "image/png",
            purpose: "maskable any",
          },
          {
            src: "/assets/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable any",
          },
        ],
      },
    }),
  ],
});
