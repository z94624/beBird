// https://router.vuejs.org/api/interfaces/RouterOptions.html
import { App } from 'vue';
import { RouteRecordRaw, createRouter, createWebHashHistory } from 'vue-router';
import { createRouterGuards } from './router-guards';

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'Home',
        meta: {},
        component: () => import('@/views/Home.vue'),
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
    scrollBehavior: () => ({ left: 0, top: 0 }),
});

export const setupRouter = (app: App<Element>) => {
    app.use(router);
    // 創建 Router Guards
    createRouterGuards(router);
};
