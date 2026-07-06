export const SITE = {
  name: {
	main: '仏光堂',
	sub: 'エンゼルセンター',
  },
  fullName: 'エンゼルセンター仏光堂',
} as const;


// 2つの運営会社の情報をまとめる置き場。
export const COMPANIES = {
  A: {
	name: '株式会社メモリードグループ エンゼルセンター',
	zip: '850-0077',
	address: '長崎県長崎市小瀬戸町809-12',
	tel: '095-865-4400',
	hours: '9:00-17:00',
	closed: '',
	area: '',
  },
  B: {
	name: '株式会社メモリード 長崎仏光堂',
	zip: '850-0046',
	address: '長崎県長崎市幸町4-13',
	tel: '095-825-6386',
	hours: '9:00-17:00',
	closed: '',
	area: '',
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