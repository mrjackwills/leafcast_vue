import './registerServiceWorker';
import { store } from '@/store';
import App from './App.vue';
import Meta from 'vue-meta';
import router from '@/router';
import Vue from 'vue';
import vuetify from '@/plugins/vuetify';
import { VNode } from 'vue/types/umd';
Vue.use(Meta);

Vue.config.productionTip = process.env.VUE_APP_MODE === 'production' ? false : true;

new Vue({
	router,
	vuetify,
	store,
	render: (r): VNode => r(App)
}).$mount('#leafcast_app');