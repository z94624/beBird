import { App } from 'vue';
import { createI18n } from 'vue-i18n';

import { WebLangEnum } from '@/models/enum/language';

import commonEnUs from '@/locales/en-us/common.json';
import commonZhTw from '@/locales/zh-tw/common.json';
import routerEnUs from '@/locales/en-us/router.json';
import routerZhTw from '@/locales/zh-tw/router.json';
import weatherEnUs from '@/locales/en-us/weather.json';
import weatherZhTw from '@/locales/zh-tw/weather.json';
import visitorEnUs from '@/locales/en-us/visitor.json';
import visitorZhTw from '@/locales/zh-tw/visitor.json';

/**
 * 取得國家語系代碼
 */
const getLocale = () => {
	const userLocale = localStorage.getItem('i18n-locale');
	return userLocale ?? WebLangEnum.TAIWAN;
};

/**
 * 合併譯本檔案
 */
type transDictionary = Record<string, string>;
const mergeDictionaries = (...dicts: transDictionary[]): transDictionary => {
	return Object.assign({}, ...dicts);
};

const i18n = createI18n({
	legacy: false, // you must set `false`, to use Composition API
	locale: getLocale(),
	fallbackLocale: WebLangEnum.AMERICA,
	messages: {
		[WebLangEnum.AMERICA]: mergeDictionaries(commonEnUs, routerEnUs, weatherEnUs, visitorEnUs),
		[WebLangEnum.TAIWAN]: mergeDictionaries(commonZhTw, routerZhTw, weatherZhTw, visitorZhTw),
	},
});

export const setupI18n = (app: App<Element>) => {
	app.use(i18n);
};
