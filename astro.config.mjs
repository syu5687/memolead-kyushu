import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static',
  site: 'https://memolead-k-665477084949.asia-northeast1.run.app',
  publicDir: './public',
  trailingSlash: 'always',  // URLは常に末尾スラッシュあり(/contact/)に統一
  build: {
    format: 'directory',    // 各ページを /xxx/index.html 形式で生成(デフォルトの明示)
  },
});
