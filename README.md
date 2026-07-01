# Oʻzbekcha — 乌兹别克语生存包

给去乌兹别克斯坦的旅行者的乌兹别克语生存短语卡。按场景浏览，每张卡有拉丁 + 西里尔 + 发音 + 中文，
可展开看「对方可能的回话」、可替换词和当地注脚，配正常/慢速发音。无注册、不收集信息。

姊妹项目 [`../Russian_travel`](../Russian_travel) 教俄语（当地通用语）；本站教乌兹别克语本身。

## 技术栈

Astro 4 + Tailwind 3 + TypeScript。纯静态站，无后端、无 PWA。发音由 Edge TTS（`uz-UZ-MadinaNeural`）离线预生成。

## 运行

```bash
npm install
npm run dev        # http://localhost:4321
npm run check      # TypeScript / astro 校验
npm run build      # 产出 dist/ 静态站
npm run preview    # 本地预览构建产物
```

## 生成 / 补齐发音音频

```bash
uv run --with edge-tts scripts/generate-tts.py
```

读 `src/data/cards.json` 每张卡的 `latin` 字段合成 mp3，写入 `public/audio/<scene>/`。
`SKIP_EXISTING=True`，加卡后重跑只补缺的。需要联网访问微软 TTS 服务；连不上时站点仍可用（纯文本，音频按钮静默失败）。

## 加内容

改 `src/data/cards.json`（schema 见 `docs/card-schema.md`），再跑一次 TTS 脚本补音频。约定见 `CLAUDE.md`。
