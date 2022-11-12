// Components
import App from './App.vue';
import { createPinia } from 'pinia';

// Composables
import { createApp } from 'vue';
import vuetify from './plugins/vuetify';
import router from './router';
import { createHead } from '@vueuse/head';
import type { Router } from 'vue-router';

const head = createHead();

const app = createApp(App);

// inject router into store
declare module 'pinia' {
	export interface Pinia {
		router: () => Router
	}
	export interface PiniaCustomProperties {
		router: Router
	}
}
const pinia = createPinia();
pinia.use(({ store }) => {
	store.router = markRaw(router);
});
pinia.router = (): Router => router;

app
	.use(head)
	.use(router)
	.use(pinia)
	.use(vuetify)
	.mount('#leafcast_app');
