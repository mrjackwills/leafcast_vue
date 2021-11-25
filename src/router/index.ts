import Router from 'vue-router';
import Vue from 'vue';

import { UserModule } from '@/store';

Vue.use(Router);

export default new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [
		{
			path: '/login',
			name: 'login',
			// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
			component: () => import(/* webpackChunkName: "n" */ '@/views/Login.vue'),
			beforeEnter: (_to, _from, next): void => {
				const isAuthenticated = UserModule.authenticated;
				if (isAuthenticated) next('/');
				else next();
			},
		},
		{
			path: '/',
			name: 'home',
			// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
			component: () => import(/* webpackChunkName: "n" */ '@/views/Home.vue'),
			beforeEnter: (_to, _from, next): void => {
				const isAuthenticated = UserModule.authenticated;
				if (!isAuthenticated) next('/login');
				else next();
			},
		},
		{
			path: '/video',
			name: 'video',
			// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
			component: () => import(/* webpackChunkName: "n" */ '@/views/Video.vue'),
			beforeEnter: (_to, _from, next): void => {
				const isAuthenticated = UserModule.authenticated;
				if (!isAuthenticated) next('/login');
				else next();
			},
		},
		{
			path: '*',
			redirect: { name: 'home' },
		},
	]
});
