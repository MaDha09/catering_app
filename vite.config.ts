import { defineConfig } from 'vite';
import { resolve } from "path";
import { main } from "@popperjs/core";

export default defineConfig({
  root: './src',
  build: {
    outDir: '../dist',
    minify: false,
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        login: resolve(__dirname, "src/login.html"),
        sign: resolve(__dirname, "src/sign.html"),
        profile: resolve(__dirname, "src/profile.html"),
        rec: resolve(__dirname, "src/rec.html"),
        recipe: resolve(__dirname, "src/recipe.html"),
        myr: resolve(__dirname, "src/myr.html"),
        prec: resolve(__dirname, "src/prec.html"),
        orders: resolve(__dirname, "src/orders.html"),
      }
    }
  },
});
