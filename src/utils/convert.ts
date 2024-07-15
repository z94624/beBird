import { colors } from 'quasar';
import { isHexColor } from './common';

const { lighten, brightness, getPaletteColor } = colors;

/**
 * 把 Enum 轉換成物件
 * @param enumType
 * @returns
 */
export function enumToMap<E>(enumType: E & object): { [key: string]: E[keyof E] } {
	const obj: { [key: string]: E[keyof E] } = {};
	for (const key of Object.keys(enumType)) {
		if (isNaN(Number(key))) {
			const valueKey = key as keyof E;
			obj[key] = enumType[valueKey];
		}
	}
	return obj;
}

/**
 * 把 Enum 的 Key 轉換成物件
 * @param enumType
 * @returns
 */
export function enumKeysToArray<E>(enumType: E & object): string[] {
	return Object.keys(enumType).filter((key) => isNaN(Number(key)));
}

/**
 * 經緯度數轉換
 * Decimal Degrees(DD) => Degrees, minutes and Seconds(DMS)
 */
export const convertDDToDMS = (
	dd: number
): {
	d: number;
	m: number;
	s: number;
} => {
	const d = Math.floor(dd);

	const minfloat = (dd - d) * 60;
	const m = Math.floor(minfloat);

	const s = (minfloat - m) * 60;

	return { d, m, s };
};

/**
 * 背景 <=> 字體 對比色
 */
export const getContrastColor = (color: string) => {
	const hexColor = isHexColor(color) ? color : getPaletteColor(color);
	return brightness(hexColor || '#000') < 128
		? lighten(hexColor || '#000', 85)
		: lighten(hexColor || '#000', -85);
};

/**
 * 從 HTML 字串抽取文字
 */
export const extractTextFromHtml = (html: string): string => {
	return new DOMParser().parseFromString(html, 'text/html').body.textContent || '';
};
