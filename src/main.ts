import './registerServiceWorker';
import { createPinia, PiniaVuePlugin } from 'pinia';
import { env } from './vanillaTS/env';
import { router } from '@/router';
import { VNode } from 'vue/types/umd';
import App from './App.vue';
import Meta from 'vue-meta';
import Vue from 'vue';
import vuetify from '@/plugins/vuetify';

const pinia = createPinia();

Vue.use(PiniaVuePlugin);
Vue.use(Meta);

Vue.config.productionTip = !env.production_mode;

new Vue({
	router: router,
	vuetify,
	pinia,
	render: (r): VNode => r(App)
}).$mount('#leafcast_app');