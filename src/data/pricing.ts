// ─────────────────────────────────────────────
// 料金データ一元管理(Single Source of Truth)
// ─────────────────────────────────────────────
// このファイルを変更すると:
//   - 各サービスページの料金表(estate.astroなど)
//   - 仮見積りシミュレーション(/estimate/)
// の両方に自動反映されます。
//
// 将来Firestore接続時は、このファイルの export を
// 非同期取得に置き換えれば、ページ側のコードはそのまま使えます。
// ─────────────────────────────────────────────

export interface PricingPlan {
  id: string;              // 一意ID(チェックボックス制御に使う)
  label: string;           // 表示名(例: '1K (15㎡)')
  price: number;           // 金額(円・税込)
  size?: string;           // 任意:広さ・規模情報(料金表に表示)
  time?: string;           // 任意:作業時間目安
  note?: string;           // 任意:備考
  popular?: boolean;       // 任意:人気バッジ
}

export interface ServicePricing {
  serviceKey: string;          // estate, junk, ...
  serviceLabel: string;        // 表示名(例: '遺品整理')
  serviceUrl: string;          // サービスページURL
  questionLabel: string;       // シミュレーション時の質問文
  plans: PricingPlan[];        // 選択肢(プラン一覧)
  unit?: string;               // 任意:単位(/年 など)
  notes?: string[];            // 料金表下部の注意書き
}

// 料金フォーマット関数(数値 → "66,000円〜" 形式)
export function formatYen(price: number, withSuffix: boolean = true): string {
  if (price === 0) return '要相談';
  const formatted = price.toLocaleString('ja-JP');
  return withSuffix ? `${formatted}円〜` : `${formatted}円`;
}

// 料金フォーマット関数(税込表記版)
export function formatYenWithTax(price: number): string {
  if (price === 0) return '要相談';
  return `${price.toLocaleString('ja-JP')}円（税込）`;
}

// ─────────────────────────────────────────────
// サービスごとの料金データ
// ─────────────────────────────────────────────

export const pricing: ServicePricing[] = [
  // ─── 01 遺品整理 ───
  {
    serviceKey: 'estate',
    serviceLabel: '遺品整理',
    serviceUrl: '/services/estate/',
    questionLabel: 'お部屋の広さをお選びください',
    plans: [
      { id: 'estate-1k',     label: '1K',     size: '〜15㎡', time: '2〜3時間', price: 66000 },
      { id: 'estate-1dk',    label: '1DK',    size: '〜25㎡', time: '3〜4時間', price: 88000, popular: true },
      { id: 'estate-1ldk',   label: '1LDK',   size: '〜40㎡', time: '5〜7時間', price: 132000 },
      { id: 'estate-2dk',    label: '2DK',    size: '〜50㎡', time: '6〜8時間', price: 165000 },
      { id: 'estate-2ldk',   label: '2LDK',   size: '〜60㎡', time: '1日',       price: 220000 },
      { id: 'estate-3dk',    label: '3DK〜',  size: '〜70㎡', time: '1〜2日',   price: 275000 },
      { id: 'estate-house',  label: '一軒家', size: '70㎡〜', time: '2〜3日',   price: 330000 },
    ],
    notes: [
      '上記は目安となる金額です。お部屋の状況・残置物の量・搬出経路などにより前後する場合があります。',
      '買取可能な品がある場合は、料金から差し引きいたします。',
      'リサイクル料金が必要な家電(テレビ・冷蔵庫・洗濯機・空調機等)は別途申し受けます。',
    ],
  },

  // ─── 02 遺品整理・不用品回収 ───
  {
    serviceKey: 'junk',
    serviceLabel: '遺品整理・不用品回収',
    serviceUrl: '/services/estate/',
    questionLabel: '回収量・追加サービスをお選びください',
    plans: [
      { id: 'junk-angel-1',   label: 'エンゼル号1台',  size: '軽トラック1台分',  price: 11000, popular: true },
      { id: 'junk-angel-2',   label: 'エンゼル号2台',  size: '軽トラック2台分',  price: 22000 },
      { id: 'junk-otakiage',  label: '仏壇お焚き上げ供養', size: '閉眼供養つき',   price: 33000 },
      { id: 'junk-doll',      label: '人形・節句人形供養', size: '1セット',         price: 16500 },
      { id: 'junk-cleaning',  label: 'ハウスクリーニング(1K相当)', size: '清掃のみ',  price: 27500 },
    ],
    notes: [
      'エンゼル号料金は基本回収料金です。お品物により追加料金が発生する場合があります。',
      '長崎県内は出張費無料です(離島・遠隔地は別途応相談)。',
      'リサイクル料金が必要な家電(テレビ・冷蔵庫・洗濯機・空調機等)は別途申し受けます。',
    ],
  },

  // ─── 08 墓じまい ───
  {
    serviceKey: 'grave-closure',
    serviceLabel: '墓じまい',
    serviceUrl: '/services/grave-closure/',
    questionLabel: 'お墓のサイズをお選びください',
    plans: [
      { id: 'grave-small',     label: '標準サイズ',  size: '1〜2㎡', time: '墓石撤去・整地含む',  price: 200000, popular: true },
      { id: 'grave-medium',    label: '中規模',      size: '3〜4㎡', time: '墓石撤去・整地含む',  price: 320000 },
      { id: 'grave-large',     label: '大規模',      size: '5㎡以上', time: 'お見積もり制',        price: 480000 },
      { id: 'grave-permit',    label: '改葬許可申請代行',  size: '1柱あたり',  price: 33000 },
      { id: 'grave-ceremony',  label: '閉眼供養(お布施)', size: 'お寺様への謝礼', price: 50000 },
    ],
    notes: [
      '墓地の立地(山間部・離島など)により搬出費用が変動いたします。',
      '新たな供養先の費用は別途必要です(永代供養墓・納骨堂など)。',
      '詳細は現地確認のうえ、お見積もりさせていただきます。',
    ],
  },


  // ─── 09海洋散骨 ───
  {
    serviceKey: 'ocean',
    serviceLabel: '海洋散骨',
    serviceUrl: '/services/ocean/',
    questionLabel: 'ご希望のプランをお選びください',
    plans: [
      { id: 'ocean-charter',   label: 'チャータープラン',    size: 'ご家族貸切・10名様まで',  price: 300000 },
      { id: 'ocean-joint',     label: '合同プラン',          size: '2〜4名様',                price: 100000, popular: true },
      { id: 'ocean-consign',   label: '委託プラン',          size: 'スタッフが代行',          price: 50000 },
      { id: 'ocean-partial',   label: '部分散骨プラン',      size: 'ご遺骨の一部のみ',        price: 35000 },
    ],
    notes: [
      'すべてのプランにご遺骨の粉骨費用が含まれます。',
      '散骨証明書を発行いたします。',
      '天候によりお日にちの変更をお願いする場合があります。',
    ],
  },
];

// ─────────────────────────────────────────────
// ヘルパー関数
// ─────────────────────────────────────────────

// serviceKeyから該当サービスを取得
export function getServicePricing(serviceKey: string): ServicePricing | undefined {
  return pricing.find(s => s.serviceKey === serviceKey);
}

// プランIDから該当プランを取得(全サービス横断)
export function getPlanById(planId: string): { service: ServicePricing; plan: PricingPlan } | undefined {
  for (const service of pricing) {
    const plan = service.plans.find(p => p.id === planId);
    if (plan) return { service, plan };
  }
  return undefined;
}

// 選択されたプランID配列から合計金額を計算
export function calculateTotal(planIds: string[]): number {
  return planIds.reduce((sum, id) => {
    const result = getPlanById(id);
    return sum + (result?.plan.price ?? 0);
  }, 0);
}
