import { createApp } from 'vue';
import './style.css';
import App from './App.vue';

import { Quasar } from 'quasar';
// Import icon libraries
import '@quasar/extras/material-icons/material-icons.css';
// Import Quasar css
import 'quasar/src/css/index.sass';

async function bootstrap() {
    const app = createApp(App);

    app.use(Quasar, {
        plugins: {}, // import Quasar plugins and add here
    });

    // Route 準備就緒後掛載 APP 實例
    // https://router.vuejs.org/api/interfaces/router.html#isready
    // await router.isReady();
    app.mount('#app');
}

void bootstrap();
