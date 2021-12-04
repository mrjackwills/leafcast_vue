import './registerServiceWorker';
import { createPinia, PiniaVuePlugin } from 'pinia';
import { router } from '@/router';
import { VNode } from 'vue/types/umd';
import App from './App.vue';
import Meta from 'vue-meta';
import Vue from 'vue';
import vuetify from '@/plugins/vuetify';

const pinia = createPinia();

Vue.use(PiniaVuePlugin);
Vue.use(Meta);

Vue.config.productionTip = process.env.VUE_APP_MODE === 'production' ? false : true;

new Vue({
	router: router,
	vuetify,
	pinia,
	render: (r): VNode => r(App)
}).$mount('#leafcast_app');