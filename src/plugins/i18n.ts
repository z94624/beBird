import { App } from 'vue';
import { createI18n } from 'vue-i18n';

import { WebLangEnum } from '@/models/enum/languageEnum';

import commonEnUs from '@/locales/en-us/common.json';
import commonZhTw from '@/locales/zh-tw/common.json';
import routerEnUs from '@/locales/en-us/router.json';
import routerZhTw from '@/locales/zh-tw/router.json';
import weatherEnUs from '@/locales/en-us/weather.json';
import weatherZhTw from '@/locales/zh-tw/weather.json';
import ebirdEnUs from '@/locales/en-us/ebird.json';
import ebirdZhTw from '@/locales/zh-tw/ebird.json';
import contactEnUs from '@/locales/en-us/contact.json';
import contactZhTw from '@/locales/zh-tw/contact.json';
import attributionEnUs from '@/locales/en-us/attribution.json';
import attributionZhTw from '@/locales/zh-tw/attribution.json';
import socialMediaEnUs from '@/locales/en-us/socialMedia.json';
import socialMediaZhTw from '@/locales/zh-tw/socialMedia.json';
import geocodingEnUs from '@/locales/en-us/geocoding.json';
import geocodingZhTw from '@/locales/zh-tw/geocoding.json';

/**
 * 取得國家語系代碼
 */
const getLocale = () => {
	const userLocale = localStorage.getItem('i18n-locale');
	return userLocale ?? WebLangEnum.TAIWAN;
};

const i18n = createI18n({
	legacy: false, // you must set `false`, to use Composition API
	locale: getLocale(),
	fallbackLocale: WebLangEnum.AMERICA,
	messages: {
		[WebLangEnum.AMERICA]: {
			common: commonEnUs,
			router: routerEnUs,
			weather: weatherEnUs,
			ebird: ebirdEnUs,
			contact: contactEnUs,
			attribution: attributionEnUs,
			socialMedia: socialMediaEnUs,
			geocoding: geocodingEnUs,
		},
		[WebLangEnum.TAIWAN]: {
			common: commonZhTw,
			router: routerZhTw,
			weather: weatherZhTw,
			ebird: ebirdZhTw,
			contact: contactZhTw,
			attribution: attributionZhTw,
			socialMedia: socialMediaZhTw,
			geocoding: geocodingZhTw,
		},
	},
});

export const setupI18n = (app: App<Element>) => {
	app.use(i18n);
};
