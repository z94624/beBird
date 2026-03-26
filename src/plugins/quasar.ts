import { App } from 'vue';

import {
	Quasar,
	LoadingBar,
	Notify,
	Loading,
	QSpinnerHourglass,
	LocalStorage,
	SessionStorage,
} from 'quasar';
// Import Quasar css
import 'quasar/src/css/index.sass';
import MaterialIconSet from 'quasar/icon-set/material-icons';
// Import icon libraries
import '@quasar/extras/material-icons/material-icons.css';
import '@quasar/extras/material-icons-outlined/material-icons-outlined.css';
import '@quasar/extras/material-icons-round/material-icons-round.css';
import '@quasar/extras/material-icons-sharp/material-icons-sharp.css';

export const setupQuasar = (app: App<Element>) => {
	app.use(Quasar, {
		plugins: { LoadingBar, Notify, Loading, LocalStorage, SessionStorage }, // import Quasar plugins and add here
		iconSet: MaterialIconSet,
		config: {
			dark: false, // default mode is light
			brand: {
				lightText: '#101010', // 淺色主題文字色
				lightBg: '#f5f5f5', // 淺色主題背景色
				darkText: '#f2f2f2', // 深色主題文字色
				line: '#f4f3f1',
				primaryOld: '#1c1bd6', // 舊版紫嘯鶇主題色
			},
			loadingBar: {
				size: '0.1875rem',
				color: 'primary',
			},
			loading: {
				delay: 300,
				spinnerColor: 'primary',
				spinner: QSpinnerHourglass,
			},
		},
	});
};
