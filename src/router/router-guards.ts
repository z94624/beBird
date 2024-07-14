import { Router } from 'vue-router';
import { LoadingBar } from 'quasar';

export const createRouterGuards = (router: Router) => {
	// 開始進入新路由之前 (全域)
	router.beforeEach((_to, _from, next) => {
		LoadingBar.start();

		next();

		LoadingBar.stop();
	});

	// 當路由跳轉結束後 (全域)
	router.afterEach((_to, _from, _failure) => {
		LoadingBar.stop();
	});
};
