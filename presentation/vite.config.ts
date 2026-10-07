import { defineConfig } from 'vite'

// Vite 8's default lightningcss CSS minifier currently chokes on
// UnoCSS output used by the Slidev default theme; esbuild minifies fine.
export default defineConfig({
  build: {
    cssMinify: 'esbuild',
  },
})
