import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { nanoid } from "nanoid";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

export default defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...(process.env.NODE_ENV !== "production" &&
    process.env.REPL_ID !== undefined
      ? [
          import("@replit/vite-plugin-cartographer").then((m) =>
            m.cartographer(),
          ),
          import("@replit/vite-plugin-dev-banner").then((m) =>
            m.devBanner(),
          ),
        ]
      : []),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  define: {
    global: "globalThis",
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks: {
          // Split commonly used libraries into separate chunks
          'react-vendor': ['react', 'react-dom'],
          'ui-vendor': ['@radix-ui/react-accordion', '@radix-ui/react-alert-dialog', '@radix-ui/react-aspect-ratio', 
                       '@radix-ui/react-avatar', '@radix-ui/react-checkbox', '@radix-ui/react-collapsible',
                       '@radix-ui/react-context-menu', '@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu',
                       '@radix-ui/react-hover-card', '@radix-ui/react-label', '@radix-ui/react-menubar',
                       '@radix-ui/react-navigation-menu', '@radix-ui/react-popover', '@radix-ui/react-progress',
                       '@radix-ui/react-radio-group', '@radix-ui/react-scroll-area', '@radix-ui/react-select',
                       '@radix-ui/react-separator', '@radix-ui/react-slider', '@radix-ui/react-slot',
                       '@radix-ui/react-switch', '@radix-ui/react-tabs', '@radix-ui/react-toast',
                       '@radix-ui/react-toggle', '@radix-ui/react-toggle-group', '@radix-ui/react-tooltip',
                       'lucide-react'],
          'data-vendor': ['@tanstack/react-query', 'recharts', 'date-fns'],
          'form-vendor': ['react-hook-form', '@hookform/resolvers', 'zod'],
          'animation-vendor': ['framer-motion'],
          'utils-vendor': ['clsx', 'tailwind-merge', 'class-variance-authority', 'cmdk']
        },
        chunkFileNames: 'assets/chunk-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      }
    },
    chunkSizeWarningLimit: 1000 // Increase limit to 1MB to reduce warnings during dev
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});
