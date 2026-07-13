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
  qty?: boolean; // 任意:trueなら「台数×単価」の数量入力式プラン
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
      { id: 'junk-angel',     label: 'エンゼル号',      size: '軽トラック1台あたり',  price: 11000, popular: true, qty: true },
      { id: 'junk-otakiage',  label: '仏壇お焚き上げ供養', size: '閉眼供養つき',   price: 33000 },
      { id: 'junk-doll',      label: '人形・節句人形供養', size: '1セット',         price: 16500 },
      { id: 'junk-cleaning',  label: 'ハウスクリーニング(1K相当)', size: '清掃のみ',  price: 27500 },
    ],
    notes: [
      'エンゼル号料金は基本回収料金です。お品物により追加料金が発生する場合があります。',
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
  // ─── 06 仏壇（神棚）じまい ───（A社・金額未確定のため price:0＝要相談で表示）
  {
    serviceKey: 'altar-closing',            // ?service=altar-closing の自動選択に使うslug
    serviceLabel: '仏壇（神棚）じまい',
    serviceUrl: '/services/altar-closing/',
    questionLabel: '供養・処分をご希望の品目をお選びください',
    plans: [
      // price:0 は formatYenWithTax 側で「要相談」と表示される。金額確定後は数値へ差し替えるだけ
      { id: 'altar-standard', label: '仏壇供養処分（標準）',       size: '高さ50cm以上',   price: 0, popular: true },
      { id: 'altar-compact',  label: '小型仏壇供養処分',           size: '高さ50cm以下',   price: 0 },
      { id: 'altar-kamidana', label: '神棚供養処分',               size: '一般的なサイズ', price: 0 },
      { id: 'altar-ihai',     label: '位牌供養処分',               size: '1基あたり',      price: 0 },
      { id: 'altar-doll',     label: '人形・節句人形供養',         size: '1セット',        price: 0 },
      { id: 'altar-visit',    label: '出張閉眼供養（僧侶料含む）', size: '長崎県内',       price: 0 },
    ],
    notes: [
      '上記は目安です。仏壇のサイズ・状態により金額は変動いたします。',
      '出張供養の場合、長崎県内は出張費無料です。県外は別途ご相談ください。',
      '供養証明書をご希望の場合、発行料は料金に含まれます。',
    ],
  },



  // ─── 09海洋散骨 ───
  {
    serviceKey: 'ocean',
    serviceLabel: '海洋散骨',
    serviceUrl: '/services/ocean/',
    questionLabel: 'ご希望のプランをお選びください',
    plans: [
    { id: 'ocean-charter', label: 'チャーター散骨プラン',           size: '1〜8名様乗船',             price: 264000 },
    { id: 'ocean-joint',   label: '合同散骨プラン',                 size: '1〜2名様乗船',             price: 187000, popular: true },
    { id: 'ocean-agency',  label: '代行散骨プラン',                 size: 'ご遺骨1柱につき・粉骨含む', price: 77000 },
    { id: 'ocean-pearl',   label: '真珠散骨プラン（Pearl Memory）', size: 'ご遺骨1柱につき',           price: 440000 },
    ],
    notes: [
      '散骨証明書を発行いたします。',
      '天候によりお日にちの変更をお願いする場合があります。',
          ],
        },
      
        // ─── 07 仏壇リメイク ───（B社・金額未確定のため price:0＝要相談で表示）
        {
          serviceKey: 'altar-remake',           // ?service=altar-remake の自動選択に使うslug
          serviceLabel: '仏壇リメイク',
          serviceUrl: '/services/altar-remake/',
          questionLabel: 'リメイクのタイプをお選びください',
          plans: [
            // price:0 は formatYen 側で「要相談」と表示される。金額が確定したら数値へ差し替えるだけ
            { id: 'remake-compact', label: 'コンパクト型リメイク',     size: '元仏壇のサイズによる', price: 0 },
            { id: 'remake-modern',  label: 'モダン家具型リメイク',     size: 'デザインにより変動',   price: 0 },
            { id: 'remake-stage',   label: 'ステージ型リメイク',       size: 'シンプル仕様',         price: 0 },
            { id: 'remake-wood',    label: '木材活用リメイク（小物）', size: '写真立て・小箱など',   price: 0 },
          { id: 'remake-transport', label: '搬出・搬入費',             size: '長崎県内',             price: 0 },
            { id: 'remake-ceremony',  label: '閉眼・開眼供養手配',       size: 'お寺様のお布施含む',   price: 0 },
          ],
          notes: [
            '料金はリメイクのタイプ・元仏壇のサイズ・使用材料により変動いたします。',
            '製作期間は1〜3ヶ月が目安です。',
            '詳細は現地確認のうえ、お見積もりさせていただきます。',
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
