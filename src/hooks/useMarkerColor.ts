import { type Ref, isRef } from 'vue';
import { colors } from 'quasar';

const { lighten } = colors;

/**
 * 鳥科色相調色盤
 * 根據 familyCode 的 hash 值循環取色，確保顏色區隔明顯
 * 使用能清楚在地圖上辨識的飽和色
 */
const FAMILY_HUE_PALETTE: string[] = [
	'#e05c5c', // 紅
	'#e0935c', // 橙
	'#d4b800', // 黃
	'#5cb85c', // 綠
	'#5cb8a0', // 青綠
	'#5c9ae0', // 藍
	'#7b5ce0', // 靛紫
	'#c05ce0', // 紫
	'#e05ca8', // 粉紅
	'#5ce0d0', // 水藍
	'#a0c05c', // 黃綠
	'#e0c45c', // 金黃
];

/**
 * djb2 雜湊函式：將字串映射為穩定的正整數
 */
const hashString = (str: string): number => {
	let hash = 5381;
	for (let i = 0; i < str.length; i++) {
		hash = (hash * 33) ^ str.charCodeAt(i);
	}
	return Math.abs(hash);
};

/**
 * 根據 familyCode 取得對應的基礎色（色相固定）
 */
const getBaseColorByFamily = (familyCode: string): string => {
	const index = hashString(familyCode) % FAMILY_HUE_PALETTE.length;
	return FAMILY_HUE_PALETTE[index];
};

/**
 * 圖釘顏色 Composable
 *
 * 顏色策略：
 * - 色相：由 familyCode 決定（同科鳥種同色）
 * - 明度：由觀察距今天數決定（越舊越淡），使用 Quasar colors.lighten()
 *
 * @param maxDays 最大天數區間，支援純數字或 Ref<number>。
 *                通常對應 DATAOBSCommon.back，預設 30。
 *                傳入 Ref 時可響應使用者調整的 back 值。
 */
export const useMarkerColor = (maxDays: number | Ref<number> = 30) => {
	/**
	 * 根據 familyCode 與 days 計算圖釘顏色
	 *
	 * @param familyCode eBird 鳥科代碼（來自 taxInfoDict[speciesCode]?.familyCode）
	 * @param days 距今天數（來自 getDateDiffFromNow(obs.obsDt)）
	 * @returns Hex 顏色字串，可直接傳入 GoogleMarkerIcon 的 bgColor prop
	 */
	const getMarkerColor = (familyCode: string | undefined, days: number): string => {
		// 無科資訊時 fallback 為 primary 色
		const baseColor = familyCode ? getBaseColorByFamily(familyCode) : '#6d6ae4';

		// 每次取用最新的 maxDays（支援 Ref 響應式）
		const max = isRef(maxDays) ? maxDays.value : maxDays;

		// ratio: 0（今天/最新）→ 1（最舊），線性漸淡
		const ratio = Math.min(Math.max(days, 0) / max, 1);

		// lighten 百分比：0%（不淡化）→ 55%（大幅淡化）
		// 保留最低飽和感，避免過淡難以辨認
		const lightenPercent = Math.round(ratio * 55);

		return lighten(baseColor, lightenPercent);
	};

	return { getMarkerColor };
};
