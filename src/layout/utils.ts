import { QSelectOption } from 'quasar';

/**
 * 地圖選單列表
 */
export const menuList: {
	name: string;
	label: string;
	icon?: string;
	separator?: boolean;
	to?: string;
}[] = [
	{
		name: 'rareBirds',
		label: '稀有鳥地圖',
		icon: 'o_campaign',
		to: '/rare-birds-map',
		separator: true,
	},
	// {
	// 	name: 'birdWatching',
	// 	label: '鳥人賞鳥地圖',
	// 	icon: 'o_group',
	// 	to: '/bird-watching-map',
	// },
	// {
	// 	name: 'birdDistribution',
	// 	label: '鳥類分布地圖',
	// 	icon: 'o_flutter_dash',
	// 	to: '/bird-distribution-map',
	// },
	// {
	// 	name: 'birdComposition',
	// 	label: '地區組成地圖',
	// 	icon: 'o_location_on',
	// 	to: '/bird-composition-map',
	// },
	// {
	// 	name: 'routineRoute',
	// 	label: '例行路線地圖',
	// 	icon: 'o_route',
	// 	to: '/routine-route-map',
	// },
];

/**
 * 版本資訊列表
 */
export const versionList: {
	version: string; // 版本號
	releaseDate: string; // 發佈日期
	features?: string[]; // 新功能；feat
	fixes?: string[]; // 修正；fix
	changes?: string[]; // 變更；change
	perfs?: string[]; // 優化；perf
}[] = [
	{
		version: '1.0.2',
		releaseDate: '2024/08/12',
		changes: [
			'For mobile device, the search panel is moved into the right drawer, and the menu is moved into the left drawer.',
			'New logo icon and logo text.',
		],
	},
	{
		version: '1.0.1',
		releaseDate: '2024/07/30',
		features: ['Convert the website to Progressive Web App(PWA).'],
		changes: ['For mobile device, the search panel on the map is full in width.'],
	},
	{
		version: '1.0.0',
		releaseDate: '2024/07/25',
		features: [
			'A button at the bottom-right of the map that helps user locate himself.',
			'A button at the bottom-left of the map that provides some map layers for user to choose.',
		],
	},
	{
		version: '0.9.2',
		releaseDate: '2024/07/21',
		perfs: [
			'Use the coordinates of the first record as the center of the map after every search.',
			'The zoom level of the map changes with the search values of country and region.',
		],
	},
	{
		version: '0.9.1',
		releaseDate: '2024/07/17',
		features: ['版本按鈕點擊可顯示更新細節'],
		fixes: ['剛進入地圖時，不以使用者地理座標為中心'],
		changes: [
			'分享稀有鳥訊息由 HTML 字串改為純文字',
			'「時間間隔(幾天以前)」搜尋參數預設值改為 5 天前',
		],
	},
	{
		version: '0.9.0',
		releaseDate: '2024/07/14',
		features: ['稀有鳥地圖(基本版)開放測試'],
	},
];
// 版本號選項
export const versionOptions: QSelectOption[] = versionList.map((vi) => ({
	label: vi.version,
	value: vi.version,
}));
