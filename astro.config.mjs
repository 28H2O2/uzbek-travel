// 功能：Astro 站点构建配置
// 输入：本仓库 src/ 与 public/ 下的资源
// 输出：dist/ 静态站
// 如何运行：npm run dev / npm run build
// 依赖：astro, @astrojs/tailwind
// 在项目中的作用：声明站点元数据、注入 Tailwind
// 说明：本站是「浏览+音频」核心版，不含 PWA（离线/SW/manifest 已按范围砍掉）

import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  integrations: [
    tailwind({
      applyBaseStyles: false, // 自己控制 base，不让 Tailwind 注入它的 preflight
    }),
  ],
  server: {
    host: true,
    port: 4321,
  },
  build: {
    inlineStylesheets: 'auto',
  },
});
