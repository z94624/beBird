/**
 * Hex Color 增加透明度字串
 * @param hex Hex Color
 * @param opacity 透明度 0 ~ 1
 * @returns Hex color with opacity
 */
export const addAlphaToHex = (hex: string, opacity: number) => {
	// coerce values so ti is between 0 and 1.
	const _opacity = Math.round(Math.min(Math.max(opacity || 1, 0), 1) * 255);
	return hex + _opacity.toString(16).toUpperCase();
};

/**
 * 判斷是否為 Hex Color Code
 * @param code 色碼
 * @returns Boolean
 */
export const isHexColor = (code?: string): boolean => {
	if (!code) return false;
	// 正則表達式檢查是否為有效的16進位色碼，支援三位、六位或八位數的格式
	const regex = /^#(?:[0-9a-fA-F]{3}){1,2}(?:[0-9a-fA-F]{2})?$/;
	return regex.test(code);
};
