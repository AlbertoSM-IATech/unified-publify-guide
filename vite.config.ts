
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    // Add historyApiFallback to handle client-side routing
    historyApiFallback: true,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Add build options with rewrite configuration for SPA routing
  build: {
    rollupOptions: {}
  },
  // Create a public directory with a proper rewrite rule for production
  publicDir: "public",
  preview: {
    // Enable history mode for the preview server as well
    historyApiFallback: true,
  },
}));
