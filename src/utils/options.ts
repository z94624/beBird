import { QSelectOption } from 'quasar';

import { enumKeysToArray, enumToMap } from './convert';
import { WebLangEnum } from '@/models/enum/language';

/**
 * 網站語言
 */
export const webLangKeys = enumKeysToArray(WebLangEnum);
export const webLangMap = enumToMap(WebLangEnum);
export const webLangCountryNameMap = {
	[WebLangEnum.TAIWAN]: '臺灣',
	[WebLangEnum.AMERICA]: 'United States',
};
export const webLangNameMap = {
	[WebLangEnum.TAIWAN]: '繁體中文',
	[WebLangEnum.AMERICA]: 'English',
};
export const webLangOptions = webLangKeys.reduce((arr: QSelectOption[], key) => {
	arr.push({
		label: webLangNameMap[webLangMap[key]],
		value: webLangMap[key],
	});
	return arr;
}, []);
