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
