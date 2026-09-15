import { type Ref, isRef } from 'vue';
import { colors } from 'quasar';

const { lighten } = colors;

/**
 * 鳥科色相調色盤 (12 色)
 * 根據 familyCode 的 hash 值循環取色，確保顏色區隔明顯。
 *
 * 色彩設計標準（兼顧深淺色模式）：
 * 1. 與白色圖標（#ffffff）具備 WCAG AA 圖形對比度（>= 3.0:1），避免亮黃/淺青色反白不可辨
 * 2. 在淺色底圖（CartoDB Voyager）有足夠邊界與對比（>= 2.8:1）
 * 3. 在深色底圖（CartoDB DarkMatter）具備足夠鮮活度與辨識度（>= 3.7:1），避免深藍/暗紫沉底
 * 4. 12 種色相在色輪上均勻分佈，相鄰科別可迅速肉眼區分
 */
const FAMILY_HUE_PALETTE: string[] = [
	'#ef4444', // 紅 (Crimson Red)
	'#ea580c', // 橙 (Warm Orange)
	'#d97706', // 琥珀金 (Amber Gold，取代易反白的淡黃)
	'#65a30d', // 萊姆綠 (Lime Green)
	'#16a34a', // 翠綠 (Emerald Green)
	'#0d9488', // 青綠/松石 (Teal)
	'#0891b2', // 湖藍/青 (Ocean Cyan，取代易反白的水藍)
	'#3b82f6', // 寶藍 (Royal Blue)
	'#6366f1', // 靛青 (Indigo)
	'#a855f7', // 紫羅蘭 (Purple)
	'#d946ef', // 洋紅/桃紅 (Magenta)
	'#f43f5e', // 玫瑰紅 (Rose)
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
