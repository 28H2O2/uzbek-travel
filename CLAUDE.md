# Uzbek Travel — 项目约定

> 一个网站：乌兹别克语生存短语卡，给去乌兹别克斯坦的旅行者。
> 「浏览 + 音频」核心版：按场景浏览卡片 + 发音，无账号、不收集信息。
> 姊妹项目 `../Russian_travel` 教俄语；本站教乌兹别克语本身。

---

## 范围红线（本版）

1. **手机优先**——所有视觉、交互以手机竖屏为第一目标，PC 能用是副产品。
2. **零账号、零收集**——无注册、不收集任何信息。
3. **本版只做「浏览 + 音频」**——不做 SRS 练习、进度存储、数据备份、PWA 离线、路牌页。
   这些是明确的 out of scope，要加须先改本文件再动手。

---

## 内容真理

`src/data/cards.json` 是所有卡片内容的唯一真理来源，严格遵守 `docs/card-schema.md` 的 schema。
当数据与代码冲突时，**改代码不改数据**（除非数据违反 schema）。

每张卡必须有：`latin`（拉丁主）/ `cyrillic`（西里尔辅）/ `pronunciation`（发音式音译，大写=重音）/
`chinese` / `literal`（字面直译或词源）/ `audio.phrase_normal` + `audio.phrase_slow` /
`politeness`（`siz` / `sen` / `neutral`）/ `likely_responses`（对方可能的回话，本项目核心字段）/
`slots` / `local_note` / `verification_status`（默认 `ai_generated_unreviewed`）。

- 乌兹别克语拉丁正字法：`ʻ`（U+02BB modifier letter）用于 `oʻ`(=西里尔ў)、`gʻ`(=西里尔ғ)，全库统一。
- `likely_responses` 唯一允许空数组的情况：独词应答类（`Ha`/`Yoʻq`/数字/方向/`Iltimos` 等本身就是回答）。

## 8 场景

`essentials` 必备礼貌 / `money` 数字钱 / `transport` 交通 / `food` 餐饮 /
`lodging` 住宿 / `shopping` 购物砍价 / `emergency` 应急 / `chat` 闲聊文化。
顶部「必备柜」跨场景钉 10 张 `is_essential: true` 的高频卡（按 `tier` 排序）。

---

## 代码规范

- **语言**：TypeScript（严格）+ Astro 组件
- **样式**：Tailwind 工具类 + 一份 `src/styles/global.css` 装 design token（CSS 变量）
- **不引入**：React / Vue / 状态管理库 / UI 组件库 / PWA
- **音频文件**：`public/audio/<scene>/<scene>_NNNN_<normal|slow>.mp3`，对应 cards.json 里 `audio.phrase_*`
- 每个超过 30 行的源文件头部加中文注释：功能 / 输入（路径）/ 输出（路径）/ 依赖 / 在项目中的作用

## 目录约定

- `src/data/` —— 内容真理（cards.json / scenes.json）
- `src/components/` —— Astro 组件（Card / SceneSection / EssentialBar / PolitenessBadge / AudioButton）
- `src/lib/` —— 纯 TS（types / data 数据访问层）
- `src/pages/` —— 只有 index.astro
- `public/audio/` —— 预生成的所有 mp3
- `scripts/` —— 音频生成脚本（不进 bundle）
- `docs/` —— AI-人共读文档（card-schema.md 等）

---

## AI 协作规则

- 改卡片优先改 `cards.json`，不改组件
- 改设计 token 优先改 `global.css` 的 CSS 变量，不改 Tailwind 配置
- 音频相关脚本放 `scripts/`，不污染 `src/`
- 跑 dev / build 后自查：手机视口下能否一眼看到卡片主行（latin / pronunciation / chinese），
  西里尔辅行是否可读，展开动画是否顺滑
- AI 生成的卡片必须保留 `verification_status: ai_generated_unreviewed`，不许偷偷标 verified
- 加新卡后跑 `uv run --with edge-tts scripts/generate-tts.py` 补音频（SKIP_EXISTING 只补缺的）
