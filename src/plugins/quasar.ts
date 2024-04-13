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
				'bg-primaryDark_ebird': '#113245',
				'text-primary_ebird': '#0070b3',
				'text-primaryDark_ebird': '#8ad4ff',
			},
		},
	});
};
