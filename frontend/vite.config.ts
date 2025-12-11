import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@/components": path.resolve(__dirname, "src/components"),
      "@/lib": path.resolve(__dirname, "src/lib"),
      "@/hooks": path.resolve(__dirname, "src/hooks"),
      "@/pages": path.resolve(__dirname, "src/pages"),
      "@/styles": path.resolve(__dirname, "src/styles"),
      "@assets": path.resolve(__dirname, "public/images/menovelle"),
      "@shared": path.resolve(__dirname, "..", "shared"),
    },
  },
  root: __dirname,
  publicDir: path.resolve(__dirname, "public"),
  build: {
    outDir: path.resolve(__dirname, "dist"),
    emptyOutDir: true,
    sourcemap: false,
    minify: "esbuild",
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
          ui: ["@radix-ui/react-accordion", "@radix-ui/react-tooltip"],
        },
      },
    },
  },
  server: {
    port: 5000,
    host: "0.0.0.0",
    strictPort: true,
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
  preview: {
    port: 5000,
  },
});

