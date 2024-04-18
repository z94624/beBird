import { App } from 'vue';

import { Quasar, Loading } from 'quasar';
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
		plugins: { Loading }, // import Quasar plugins and add here
		iconSet: MaterialIconSet,
		config: {
			brand: {
				'bg-primaryDark_ebird': '#385b75', // eBird 背景深色
				'text-primary_ebird': '#40718f', // eBird 字體淺色
				'text-primaryDark_ebird': '#b4cfe1', // eBird 字體深色
			},
		},
	});
};
