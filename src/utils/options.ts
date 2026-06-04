import { QSelectOption } from 'quasar';

import { enumKeysToArray, enumToMap } from './convert';
import { WebLangEnum } from '@/models/enum/languageEnum';

/**
 * 網站語言
 */
export const webLangKeys = enumKeysToArray(WebLangEnum);
export const webLangMap = enumToMap(WebLangEnum);
export const webLangCountryNameMap = {
	[WebLangEnum.TAIWAN]: '臺灣',
	[WebLangEnum.AMERICA]: 'United States',
	[WebLangEnum.FRANCE]: 'France',
	[WebLangEnum.SPAIN]: 'España',
	[WebLangEnum.GERMANY]: 'Deutschland',
};
export const webLangNameMap = {
	[WebLangEnum.TAIWAN]: '繁體中文',
	[WebLangEnum.AMERICA]: 'English',
	[WebLangEnum.FRANCE]: 'Français',
	[WebLangEnum.SPAIN]: 'Español',
	[WebLangEnum.GERMANY]: 'Deutsch',
};
export const webLangOptions = webLangKeys.reduce((arr: QSelectOption[], key) => {
	arr.push({
		label: webLangNameMap[webLangMap[key]],
		value: webLangMap[key],
	});
	return arr;
}, []);
