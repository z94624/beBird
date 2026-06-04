import { App } from 'vue';
import { createI18n } from 'vue-i18n';

import { WebLangEnum } from '@/models/enum/languageEnum';

import commonZhTw from '@/locales/zh-tw/common.json';
import routerZhTw from '@/locales/zh-tw/router.json';
import weatherZhTw from '@/locales/zh-tw/weather.json';
import ebirdZhTw from '@/locales/zh-tw/ebird.json';
import contactZhTw from '@/locales/zh-tw/contact.json';
import attributionZhTw from '@/locales/zh-tw/attribution.json';
import socialMediaZhTw from '@/locales/zh-tw/socialMedia.json';
import geocodingZhTw from '@/locales/zh-tw/geocoding.json';

import commonEnUs from '@/locales/en-us/common.json';
import routerEnUs from '@/locales/en-us/router.json';
import weatherEnUs from '@/locales/en-us/weather.json';
import ebirdEnUs from '@/locales/en-us/ebird.json';
import contactEnUs from '@/locales/en-us/contact.json';
import attributionEnUs from '@/locales/en-us/attribution.json';
import socialMediaEnUs from '@/locales/en-us/socialMedia.json';
import geocodingEnUs from '@/locales/en-us/geocoding.json';

import commonFrFr from '@/locales/fr-fr/common.json';
import routerFrFr from '@/locales/fr-fr/router.json';
import weatherFrFr from '@/locales/fr-fr/weather.json';
import ebirdFrFr from '@/locales/fr-fr/ebird.json';
import contactFrFr from '@/locales/fr-fr/contact.json';
import attributionFrFr from '@/locales/fr-fr/attribution.json';
import socialMediaFrFr from '@/locales/fr-fr/socialMedia.json';
import geocodingFrFr from '@/locales/fr-fr/geocoding.json';

import commonEsEs from '@/locales/es-es/common.json';
import routerEsEs from '@/locales/es-es/router.json';
import weatherEsEs from '@/locales/es-es/weather.json';
import ebirdEsEs from '@/locales/es-es/ebird.json';
import contactEsEs from '@/locales/es-es/contact.json';
import attributionEsEs from '@/locales/es-es/attribution.json';
import socialMediaEsEs from '@/locales/es-es/socialMedia.json';
import geocodingEsEs from '@/locales/es-es/geocoding.json';

import commonDeDe from '@/locales/de-de/common.json';
import routerDeDe from '@/locales/de-de/router.json';
import weatherDeDe from '@/locales/de-de/weather.json';
import ebirdDeDe from '@/locales/de-de/ebird.json';
import contactDeDe from '@/locales/de-de/contact.json';
import attributionDeDe from '@/locales/de-de/attribution.json';
import socialMediaDeDe from '@/locales/de-de/socialMedia.json';
import geocodingDeDe from '@/locales/de-de/geocoding.json';

import commonJaJp from '@/locales/ja-jp/common.json';
import routerJaJp from '@/locales/ja-jp/router.json';
import weatherJaJp from '@/locales/ja-jp/weather.json';
import ebirdJaJp from '@/locales/ja-jp/ebird.json';
import contactJaJp from '@/locales/ja-jp/contact.json';
import attributionJaJp from '@/locales/ja-jp/attribution.json';
import socialMediaJaJp from '@/locales/ja-jp/socialMedia.json';
import geocodingJaJp from '@/locales/ja-jp/geocoding.json';

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
		[WebLangEnum.FRANCE]: {
			common: commonFrFr,
			router: routerFrFr,
			weather: weatherFrFr,
			ebird: ebirdFrFr,
			contact: contactFrFr,
			attribution: attributionFrFr,
			socialMedia: socialMediaFrFr,
			geocoding: geocodingFrFr,
		},
		[WebLangEnum.SPAIN]: {
			common: commonEsEs,
			router: routerEsEs,
			weather: weatherEsEs,
			ebird: ebirdEsEs,
			contact: contactEsEs,
			attribution: attributionEsEs,
			socialMedia: socialMediaEsEs,
			geocoding: geocodingEsEs,
		},
		[WebLangEnum.GERMANY]: {
			common: commonDeDe,
			router: routerDeDe,
			weather: weatherDeDe,
			ebird: ebirdDeDe,
			contact: contactDeDe,
			attribution: attributionDeDe,
			socialMedia: socialMediaDeDe,
			geocoding: geocodingDeDe,
		},
		[WebLangEnum.JAPAN]: {
			common: commonJaJp,
			router: routerJaJp,
			weather: weatherJaJp,
			ebird: ebirdJaJp,
			contact: contactJaJp,
			attribution: attributionJaJp,
			socialMedia: socialMediaJaJp,
			geocoding: geocodingJaJp,
		},
	},
});

export const setupI18n = (app: App<Element>) => {
	app.use(i18n);
};
