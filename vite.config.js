import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path";
import { fileURLToPath } from "url";

// this made dirname to be available in vite.config.js  
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    // enable alias import
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
})
