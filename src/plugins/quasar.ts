import { App } from 'vue';

import { Quasar, Loading } from 'quasar';
// Import Quasar css
import 'quasar/src/css/index.sass';
import MaterialIconSet from 'quasar/icon-set/material-icons';
// Import icon libraries
import '@quasar/extras/material-icons/material-icons.css';

export const setupQuasar = (app: App<Element>) => {
    app.use(Quasar, {
        plugins: { Loading }, // import Quasar plugins and add here
        iconSet: MaterialIconSet,
    });
};
