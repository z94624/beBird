/**
 * 遷徙狀態
 */
export enum MigrationStatusEnum {
	RESIDENT = 'Resident Birds', // 留鳥
	WINTER = 'Winter Migrants', // 冬候鳥
	SUMMER = 'Summer Migrants', // 夏候鳥
	PASSAGE = 'Passage Migrants', // 過境鳥
	VAGRANT = 'Vagrant Birds', // 迷鳥
	SEA = 'Sea Birds', // 海鳥
	EXOTIC = 'Exotic Birds', // 逸鳥
}

/**
 * 出現度
 */
export enum RarityEnum {
	NORMAL = 'normal', // 普通
	UNCOMMON = 'uncommon', // 不普遍
	RARE = 'rare', // 稀有
}
