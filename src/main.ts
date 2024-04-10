import { createApp } from 'vue';
import './style.css';
import App from './App.vue';

import { setupStore } from './store';
import { setupQuasar } from './plugins/quasar';

async function bootstrap() {
    const app = createApp(App);

    // 掛載狀態管理
    setupStore(app);

    // 掛載 Quasar
    setupQuasar(app);

    // Route 準備就緒後掛載 APP 實例
    // https://router.vuejs.org/api/interfaces/router.html#isready
    // await router.isReady();
    app.mount('#app');
}

void bootstrap();
