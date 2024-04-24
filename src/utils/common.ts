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
