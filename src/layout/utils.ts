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
