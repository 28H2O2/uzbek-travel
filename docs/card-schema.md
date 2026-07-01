# 卡片 schema（`src/data/cards.json`）

每张卡是一个对象，字段如下（类型见 `src/lib/types.ts`）。

| 字段 | 类型 | 说明 |
|---|---|---|
| `id` | string | 唯一 id，用 `<scene>_NNNN`，如 `food_0002` |
| `scene` | SceneId | 所属场景，须与 scenes.json 的 id 对应 |
| `is_essential` | boolean | 是否钉进顶部「必备柜」 |
| `tier` | 1\|2\|3 | 频次/重要度，必备柜按 tier 升序取前 10 |
| `latin` | string | **主行**，乌兹别克语官方拉丁字母，如 `Qancha turadi?` |
| `cyrillic` | string | **辅行**，西里尔（老一辈/招牌/宗教场合常见） |
| `pronunciation` | string | 发音式音译，大写=重音，如 `QAN-cha tu-ra-DI` |
| `chinese` | string | 中文翻译 |
| `literal` | string | 字面直译 / 词源 / 黏着后缀拆解，让用户看见结构 |
| `audio.phrase_normal` | string | 正常速 mp3 路径 `/audio/<scene>/<scene>_NNNN_normal.mp3` |
| `audio.phrase_slow` | string | 慢速 mp3 路径 |
| `politeness` | `siz`\|`sen`\|`neutral` | siz 敬 / sen 亲昵 / neutral 中性 |
| `register_note` | string | 语体/使用场合说明 |
| `likely_responses` | ResponseEntry[] | **核心字段**：对方可能这样回。`{latin, cyrillic?, trans, cn}` |
| `slots` | SlotEntry[] | 可替换槽 `{label, swap, trans}`，可空 |
| `local_note` | string | 塔什干/乌兹别克斯坦本地注脚，卡面以 🇺🇿 前缀显示 |
| `verification_status` | enum | `ai_generated_unreviewed`（默认）/ `verified` / `native_reviewed` |

## 约定

- `latin` 里 `ʻ`（U+02BB）用于 `oʻ`、`gʻ`，全库统一（不要用直引号 `'` 或反引号）。
- `likely_responses` 允许为空数组，仅限独词应答类（`Ha`/`Yoʻq`/数字/方向/`Iltimos`）。
  其它句子至少给 1 条——「对方会怎么接话」是本站相对普通词表的核心增量。
- 加卡后跑 `scripts/generate-tts.py` 补音频；`audio` 路径与 `id` 保持一致。
- AI 生成内容一律保留 `ai_generated_unreviewed`，经母语者核对后才可改标。
