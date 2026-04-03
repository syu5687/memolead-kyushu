import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static',
  site: 'https://memolead-k-665477084949.asia-northeast1.run.app',
  // public/ 内の .htaccess を dist/ に自動コピー
  publicDir: './public',
});
