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
