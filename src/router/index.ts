import { FrontendRoutes } from '@/types/enum_routes';
import { userModule } from '@/store';
import Home from '@/views/HomeView.vue';
import Login from '@/views/LoginView.vue';

import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';

const authedRoutes: Array<RouteRecordRaw> = [
	{
		path: FrontendRoutes.BASE,
		name: 'home',
		component: Home
	},
];

for (const route of authedRoutes) {
	route.beforeEnter = (_to, _from, next): void => {
		const user_store = userModule();
		if (!user_store.authenticated) next(FrontendRoutes.LOGIN);
		else next();
	};
}

const unAuthedRoutes: Array<RouteRecordRaw> = [
	{
		path: FrontendRoutes.LOGIN,
		name: 'login',
		component: Login
	},
];

for (const route of unAuthedRoutes) {
	route.beforeEnter = (_to, _from, next): void => {
		const user_store = userModule();
		const isAuthenticated = user_store.authenticated;
		if (isAuthenticated) next(FrontendRoutes.BASE);
		else next();
	};
}

const baseRoutes: Array<RouteRecordRaw> = [
	{
		path: FrontendRoutes.CATCHALL,
		redirect: { name: 'home' },
	},
];

const routes = [ ...baseRoutes, ...unAuthedRoutes, ...authedRoutes ];

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes
});

export default router;