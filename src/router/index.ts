import Home from '@/views/Home.vue';
import Login from '@/views/Login.vue';
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
			component: Login,
			beforeEnter: (_to, _from, next): void => {
				const isAuthenticated = UserModule.authenticated;
				if (isAuthenticated) next('/');
				else next();
			},
		},
		{
			path: '/',
			name: 'home',
			component: Home,
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
