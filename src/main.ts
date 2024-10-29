import { createApp } from 'vue';
import './styles/main.css';
import './assets/fonts/GenSen_Rounded/GenSenRounded-R.ttf';
import App from './App.vue';
import { useRegisterSW } from 'virtual:pwa-register/vue';

import { setupRouter } from './router';
import { setupStore } from './store';
import { setupQuasar } from './plugins/quasar';
import { setupFirebase } from './plugins/firebase';
import VueSocialSharing from 'vue-social-sharing';
import CountryFlag from 'vue-country-flag-next';
import { createSnow, showSnow } from 'pure-snow.js';

import 'leaflet/dist/leaflet.css';
import 'pure-snow.js/style.css';

import { checkIsInChristmasSeason } from './utils/date';

useRegisterSW();

async function bootstrap() {
	const app = createApp(App);

	// 掛載 Router
	setupRouter(app);

	// 掛載狀態管理
	setupStore(app);

	// 掛載 Quasar
	setupQuasar(app);

	// 掛載 Firebase
	setupFirebase(app);

	// 社群分享按鈕套件
	app.use(VueSocialSharing);

	// 國家國旗套件
	app.use(CountryFlag);

	// 下雪套件
	createSnow(); // creates snowflakes and generate css for them
	showSnow(checkIsInChristmasSeason()); // snow can be disabled using showSnow function

	// Route 準備就緒後掛載 APP 實例
	// https://router.vuejs.org/api/interfaces/router.html#isready
	// await router.isReady();
	app.mount('#app');
}

void bootstrap();
