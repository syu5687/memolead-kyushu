// 仮お客様の声データ
// 将来Firestore接続時は、このファイルを差し替えるだけで本番データに切り替え可能

export interface CustomerVoice {
  id: string;            // 一意のID(Firestoreドキュメント ID 想定)
  text: string;          // お客様の声の本文
  name: string;          // お名前(イニシャル + 年代・性別)
  serviceKey: string;    // フィルタ用キー(estate / ocean / butsudan など)
  serviceLabel: string;  // 表示用ラベル
  date?: string;         // 任意:お声をいただいた日付(YYYY.MM形式)
}

// フィルタ用のサービス定義(順序を保ちたいので別途配列で管理)
export interface VoiceFilter {
  key: string;
  label: string;
}

export const voiceFilters: VoiceFilter[] = [
  { key: 'all',           label: 'すべて' },
  { key: 'estate',        label: '遺品整理' },
  { key: 'junk',          label: '不用品回収' },
  { key: 'butsudan',      label: '仏壇仏具' },
  { key: 'cemetery',      label: '墓地・霊園' },
  { key: 'altar-closing', label: '仏壇じまい' },
  { key: 'altar-remake',  label: '仏壇リメイク' },
  { key: 'grave-closure', label: '墓じまい' },
  { key: 'grave-keeping', label: '墓守代行' },
  { key: 'ocean',         label: '海洋散骨' },
];

export const voices: CustomerVoice[] = [
  {
    id: 'voice-1',
    text: '母が亡くなった後、何をどうすればいいか分からず途方に暮れていました。ぶっこうどうさんに相談したら、遺品整理から仏壇の選定まで全部まとめて対応してくれて本当に助かりました。スタッフの方が一品ずつ丁寧に確認してくださり、母の大切にしていた品も無事に手元に残せました。',
    name: 'K.S様（60代・女性）',
    serviceKey: 'estate',
    serviceLabel: '遺品整理・仏壇購入',
    date: '2026.03',
  },
  {
    id: 'voice-2',
    text: '父の遺志で海洋散骨を選びました。当日のスタッフの方々がとても温かく、家族みんなで穏やかに見送ることができました。事前の説明も丁寧で、料金面でも事前にきちんと提示していただいたので安心でした。海を見るたびに父を思い出します。',
    name: 'T.M様（50代・男性）',
    serviceKey: 'ocean',
    serviceLabel: '海洋散骨',
    date: '2026.03',
  },
  {
    id: 'voice-3',
    text: '実家の墓じまいを急に依頼したにも関わらず、行政手続きから石材の撤去まで迅速に対応していただきました。費用の目安を最初に提示してくれたのが特に助かりました。お寺さんとのやりとりも代行してくださり、気が重かった部分が一気に解消されました。',
    name: 'A.F様（40代・女性）',
    serviceKey: 'grave-closure',
    serviceLabel: '墓じまい',
    date: '2026.02',
  },
  {
    id: 'voice-4',
    text: '一人暮らしだった叔父の家を片付ける必要があり、遠方からなので困っていました。電話で相談したところ、立ち会いなしでも進められると教えていただき、写真でのご報告も丁寧でとても助かりました。貴重品の通帳まで見つけてくださり、感謝しています。',
    name: 'N.H様（50代・男性）',
    serviceKey: 'estate',
    serviceLabel: '遺品整理',
    date: '2026.02',
  },
  {
    id: 'voice-5',
    text: 'マンション住まいのため、実家から持ち帰った大きなお仏壇の置き場所に困っていました。仏壇リメイクのご提案をいただき、コンパクトでお部屋にも馴染むかたちに作り直していただきました。父の代から続くお仏壇を残せて、家族みんなで喜んでいます。',
    name: 'O.T様（40代・女性）',
    serviceKey: 'altar-remake',
    serviceLabel: '仏壇リメイク',
    date: '2026.02',
  },
  {
    id: 'voice-6',
    text: '夫が亡くなり、家中に残された洋服や本、家電などの整理にどれだけ時間がかかるか不安でした。エンゼル号で一度に運び出していただき、半日で目処がつきました。仏壇や人形のお焚き上げまでお願いできたのもありがたかったです。',
    name: 'Y.K様（60代・女性）',
    serviceKey: 'junk',
    serviceLabel: '不用品回収',
    date: '2026.01',
  },
  {
    id: 'voice-7',
    text: '東京在住で、長崎にある実家のお墓まで頻繁に通えないことが心苦しく思っていました。墓守代行サービスを利用し始めてから、毎月写真とご報告書が届くので安心して任せられます。父も母も天国できっと喜んでくれていると思います。',
    name: 'M.W様（50代・男性）',
    serviceKey: 'grave-keeping',
    serviceLabel: '墓守代行サービス',
    date: '2026.01',
  },
  {
    id: 'voice-8',
    text: '実家から引き取った古い仏壇と神棚の処分に困っていました。閉眼供養もきちんとしてくださり、お焚き上げの後には供養証明書もいただきました。これで母にも申し訳が立ちます。心の整理がついた気がしています。',
    name: 'I.R様（60代・女性）',
    serviceKey: 'altar-closing',
    serviceLabel: '仏壇・神棚じまい',
    date: '2025.12',
  },
  {
    id: 'voice-9',
    text: '永代供養墓を探していましたが、種類が多くてどれを選べばよいか分からず、ご相談したところ、複数の霊園を一緒に見学させていただきました。費用の比較もしてくださり、家族の希望に合った供養先を選ぶことができました。',
    name: 'H.N様（70代・男性）',
    serviceKey: 'cemetery',
    serviceLabel: '墓地・霊園ご紹介',
    date: '2025.12',
  },
];
