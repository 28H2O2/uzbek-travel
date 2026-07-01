// 功能：cards.json / scenes.json 的 TypeScript 类型定义
// 输入：被 src/lib/data.ts 与所有组件 import
// 输出：导出 Card / Scene / Politeness / ResponseEntry / SlotEntry 等类型
// 依赖：无外部依赖
// 在项目中的作用：让 IDE 与 astro check 在数据进入组件之前就报错
//
// 与 Russian_travel 的关键差异：主学语言是乌兹别克语，字段翻转为
//   「拉丁主（latin）+ 西里尔辅（cyrillic）+ 发音式音译（pronunciation）」，
//   礼貌等级用乌兹别克语的 siz（敬）/ sen（亲昵）/ neutral。

// 乌兹别克语礼貌等级：siz 用于敬称/陌生人/长辈；sen 用于熟人/同龄/晚辈
export type Politeness = 'siz' | 'sen' | 'neutral';

export type Tier = 1 | 2 | 3;

export type VerificationStatus =
  | 'ai_generated_unreviewed'
  | 'verified'
  | 'native_reviewed';

// 对方可能的回话（本项目核心创新字段）
export interface ResponseEntry {
  latin: string;      // 乌兹别克语拉丁
  cyrillic?: string;  // 西里尔（可选）
  trans: string;      // 发音式音译
  cn: string;         // 中文
}

// 可替换槽——把句中某个词换成另一个
export interface SlotEntry {
  label: string; // 中文说明，如「换成啤酒」
  swap: string;  // 替换后的乌兹别克语拉丁
  trans: string; // 替换词的发音
}

export interface CardAudio {
  phrase_normal: string;
  phrase_slow: string;
}

export interface Card {
  id: string;
  scene: string;
  is_essential: boolean;
  tier: Tier;

  latin: string;         // 主行：乌兹别克语官方拉丁字母，如 "Qancha turadi?"
  cyrillic: string;      // 辅行：西里尔（老一辈/招牌/宗教场合常见），如 "Қанча туради?"
  pronunciation: string; // 音译行：发音式拉丁化，大写=重音，如 "QAN-cha tu-ra-DI"
  chinese: string;       // 中文翻译
  literal: string;       // 字面直译/词源小注，让用户看见黏着结构

  audio: CardAudio;

  politeness: Politeness;
  register_note: string;

  likely_responses: ResponseEntry[];
  slots: SlotEntry[];

  local_note: string;
  verification_status: VerificationStatus;
}

export type SceneId =
  | 'essentials'
  | 'money'
  | 'transport'
  | 'food'
  | 'lodging'
  | 'shopping'
  | 'emergency'
  | 'chat';

export interface Scene {
  id: SceneId;
  name_zh: string;
  name_en: string;
  name_uz: string;
  color_token: SceneId;
  order: number;
  target: number; // 该场景的内容目标张数（用于头部「N/target 张」显示）
  icon: string;
  blurb: string;
}

/* ============================================================ */
/* Sign 路牌识字卡片 schema —— 独立于 Card                        */
/* ============================================================ */
//
// 与 Card 的差异：
//   - 不是用来「说」的，是用来「认」的——被动识别任务
//   - 主信息是图（真实招牌照片），不是 audio
//   - 必须有完整 attribution（CC 协议强制显示作者 / 协议 / 回链原图页）
//   - 不进任何学习队列
//   - 一张招牌可能同时含乌兹别克语拉丁 + 西里尔 + 俄语，字段都可选，
//     但 uz_latin / uz_cyrillic / ru 至少要有其一（否则没有识字对象）

export type SignCategory = 'airport' | 'street' | 'market' | 'restaurant' | 'public';

export interface SignAttribution {
  author: string;      // 作者署名，如 'Francisco Anzola'（CC0 可为空字符串）
  source_url: string;  // 该图在 Commons / Flickr / Pexels 的原始页面 URL
  license: string;     // 协议名，如 'CC BY-SA 4.0' / 'Public Domain' / 'Pexels License'
  via?: string;        // 来源平台，如 'Wikimedia Commons' / 'Pexels' / 'Openverse'
}

export interface Sign {
  id: string;              // 'street.metro_directions' 等
  category: SignCategory;

  image: {
    src: string;           // '/signs/street/metro_directions.webp'
    alt: string;           // 屏幕阅读器 / SEO 用，简短描述招牌内容
    attribution: SignAttribution;
  };

  // 招牌上实际出现的文字（多语并存，均可选，至少一项非空）
  uz_latin?: string;       // 乌兹别克语拉丁，如 'CHIQISH'
  uz_cyrillic?: string;    // 乌兹别克语西里尔，如 'ЧИҚИШ'
  pronunciation?: string;  // 发音式音译，如 'chi-QISH'
  ru?: string;             // 俄语（招牌常俄乌并存），如 'Выход'

  chinese: string;         // 中文意思——必填
  literal?: string;        // 字面拆分 / 词源小注（可选）
  context: string;         // 哪里会看到、看到了该干嘛
  local_note?: string;     // 塔什干 / 乌兹别克斯坦本地细节（可选）
  location_hint?: string;  // 拍摄地点提示（可选）——给「图寻」味儿
}
