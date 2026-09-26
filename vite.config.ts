import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig(() => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    chunkSizeWarningLimit: 1200,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("monaco-editor")) {
              return "monaco";
            }
            if (id.includes("mermaid")) {
              return "mermaid";
            }
            if (id.includes("cytoscape") || id.includes("dagre")) {
              return "cytoscape";
            }
            if (id.includes("katex")) {
              return "katex";
            }
            if (id.includes("recharts") || id.includes("d3-")) {
              return "charts";
            }
            if (id.includes("react-syntax-highlighter")) {
              return "syntax-highlighter";
            }
            if (id.includes("framer-motion")) {
              return "framer-motion";
            }
            if (id.includes("@radix-ui") || id.includes("lucide-react")) {
              return "radix-lucide";
            }
            if (id.includes("react") || id.includes("react-dom") || id.includes("react-router-dom")) {
              return "react-vendor";
            }
          }
        },
      },
    },
  },
}));