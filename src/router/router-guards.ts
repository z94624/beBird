import { Router } from 'vue-router';

export const createRouterGuards = (router: Router) => {
    // 開始進入新路由之前 (全域)
    router.beforeEach((to, from, next) => {
        next();
    });

    // 當路由跳轉結束後 (全域)
    router.afterEach((to, from, failure) => {});
};
