import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import { setupNaive } from './plugins';

async function bootstrap() {
    const app = createApp(App);

    // 註冊全局常用的 naive-ui 組件
    setupNaive(app);

    app.mount('#app', true);
}

void bootstrap();
