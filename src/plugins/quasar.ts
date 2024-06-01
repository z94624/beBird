import { App } from 'vue';

import { Quasar, LoadingBar, Notify, Loading, QSpinnerHourglass } from 'quasar';
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
		plugins: { LoadingBar, Notify, Loading }, // import Quasar plugins and add here
		iconSet: MaterialIconSet,
		config: {
			brand: {
				primaryDark_e: '#385b75',
				primary_e: '#40718f',
				primaryLight_e: '#b4cfe1',
				secondaryDark_e: '#2e261f',
				secondary_e: '#6f6e67',
				secondaryLight_e: '#dcdcd5',
			},
			loadingBar: {
				size: '3px',
				color: 'primary',
			},
			loading: {
				delay: 300,
				spinnerColor: 'secondary',
				spinner: QSpinnerHourglass,
			},
		},
	});
};
