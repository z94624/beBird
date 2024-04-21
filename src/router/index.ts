// https://router.vuejs.org/api/interfaces/RouterOptions.html
import { App } from 'vue';
import { RouteRecordRaw, createRouter, createWebHashHistory } from 'vue-router';
import { createRouterGuards } from './router-guards';
import { PageEnum } from '@/models/enum/pageEnum';

const routes: RouteRecordRaw[] = [
	{
		path: '/',
		name: 'Root',
		meta: {},
		redirect: PageEnum.MAIN_HOME,
	},
	{
		path: '/home',
		name: 'Home',
		meta: {},
		component: () => import('@/views/Home.vue'),
	},
	{
		path: '/rare-birds-map',
		name: 'RareBirds',
		meta: {},
		component: () => import('@/views/RareBirds.vue'),
	},
	{
		path: '/bird-watching-map',
		name: 'BirdWatching',
		meta: {},
		component: () => import('@/views/Home.vue'),
	},
	{
		path: '/bird-distribution-map',
		name: 'BirdDistribution',
		meta: {},
		component: () => import('@/views/Home.vue'),
	},
	{
		path: '/bird-composition-map',
		name: 'BirdComposition',
		meta: {},
		component: () => import('@/views/Home.vue'),
	},
	{
		path: '/routine-route-map',
		name: 'RoutineRoute',
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
