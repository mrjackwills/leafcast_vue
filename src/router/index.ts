import { PiniaVuePlugin } from 'pinia';
import { userModule } from '@/store';
import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

Vue.use(PiniaVuePlugin);
Vue.use(VueRouter);

const authedRoutes: Array<RouteConfig> = [
	{
		path: '/',
		name: 'home',
		// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
		component: () => import(/* webpackChunkName: "n" */ '@/views/Home.vue'),
	},
	{
		path: '/video',
		name: 'video',
		// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
		component: () => import(/* webpackChunkName: "n" */ '@/views/Video.vue'),
	}
];

for (const route of authedRoutes) {
	route.beforeEnter = (_to, _from, next): void => {
		const user_store = userModule();
		if (!user_store.authenticated) {
			next('/login');
		}
		else next();
	};
}

const unAuthedRoutes: Array<RouteConfig> = [
	{
		path: '/login',
		name: 'login',
		// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
		component: () => import(/* webpackChunkName: "n" */ '@/views/Login.vue'),
	},
];

for (const route of unAuthedRoutes) {
	route.beforeEnter = (_to, _from, next): void => {
		const user_store = userModule();
		const isAuthenticated = user_store.authenticated;
		if (isAuthenticated) next('/');
		else next();
	};
}

const baseRoutes: Array<RouteConfig> = [
	{
		path: '*',
		redirect: { name: 'home' },
	},
];

const routes = [ ...baseRoutes, ...unAuthedRoutes, ...authedRoutes ];

export const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
});