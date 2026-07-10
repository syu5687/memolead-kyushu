export const SITE = {
  name: {
	main: '仏光堂',
	sub: 'エンゼルセンター',
  },
  fullName: 'エンゼルセンター仏光堂',
  hours: '9:00-17:00',
  closed: '',
  area: '',

} as const;


// 2つの運営会社の情報をまとめる置き場。
export const COMPANIES = {
  A: {
	name: '株式会社メモリードグループ エンゼルセンター',
	zip: '850-0077',
	address: '長崎県長崎市小瀬戸町809-12',
	tel: '095-865-4400',
    fax: '--',
	hours: '9:00-17:00',
    email: '--',  
	closed: '--',
	area: '--',
    mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3356.332817197784!2d129.8272426!3d32.7303522!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3515526e262ff8bf%3A0xbf9c354d7c1dfa1b!2z44CSODUwLTAwNzcg6ZW35bSO55yM6ZW35bSO5biC5bCP54Cs5oi455S677yY77yQ77yZ4oiS77yR77yS!5e0!3m2!1sja!2sjp!4v1783391180256!5m2!1sja!2sjp',
  },
  B: {
	name: '株式会社メモリード 長崎仏光堂',
	zip: '850-0046',
	address: '長崎県長崎市幸町4-13',
	tel: '095-825-6386',
  　fax: '095-825-6395',   
  　hours: '9:00-17:00',
  　email: 'bukkoudou@memolead.co.jp',
	closed: '--',
	area: '--',
    mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3355.3299010380197!2d129.8661348!3d32.756979799999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3515532f8507bac1%3A0x12a38646aaaefa79!2z44CSODUwLTAwNDYg6ZW35bSO55yM6ZW35bSO5biC5bm455S677yU4oiS77yR77yT!5e0!3m2!1sja!2sjp!4v1783391238933!5m2!1sja!2sjp',
  },
} as const;

// 各サービス（slug）がどちらの会社かの対応表。値は COMPANIES のキー。
export const SERVICE_COMPANY = {
  estate: 'A',
  antique: 'A',
  'altar-closing': 'A',
  'grave-closure': 'A',
  inheritance: 'A',
  butsudan: 'B',
  cemetery: 'B',
  'altar-remake': 'B',
  ocean: 'B',
  } as const;
  
  // slug を渡すと、その担当会社の情報を返す。
  // 対応表に無い slug（未確定・掲載なし）は null を返し、呼び出し側で出し分けられる。
export function companyOf(slug: string) {
	const key = SERVICE_COMPANY[slug as keyof typeof SERVICE_COMPANY];
	return key ? COMPANIES[key] : null;
}

export const ESTATE_PERMITS = [
  { name: '長崎市', permit: '長崎市 第471号' },
  { name: '時津町', permit: '時津 指令第15号' },
  { name: '長与町', permit: '長与 一廃許可65号' },
];