import { App, toRefs } from 'vue';
import { createI18n } from 'vue-i18n';

import { usePreferredLanguageStoreOutsideSetup } from '@/store/modules/language';

const preferredLanguageStore = usePreferredLanguageStoreOutsideSetup();
const { userLangCode } = toRefs(preferredLanguageStore);

const getPreferredLocale = (): string => {
	console.log(userLangCode.value);
};

const i18n = createI18n({
	// something vue-i18n options here ...
});

export const setupI18n = (app: App<Element>) => {
	getPreferredLocale();
	app.use(i18n);
};
