import { defineStore } from 'pinia';
import { snackError } from '@/services/snack';
import { loadingStore } from './loading';
import { ModuleName } from '@/types/enum_module';
import { router } from '@/router';

import { piStatusStore } from './piStatus';
import { websocketStore } from './websocket';
import { imageStore } from './image';

export const userStore = defineStore(ModuleName.User, {

	state: () => ({
		authenticated: false,
		api_version: '',
	}),

	actions: {
		set_authenticated (value: boolean) {
			this.authenticated = value;
		},

		set_api_version (value: string) {
			this.api_version = value;
		},
		async logout (message?: string): Promise<void> {
			const loading_store = loadingStore();
			const piStatus_store = piStatusStore();
			const websocket_store = websocketStore();
			const image_store = imageStore();
			this.authenticated = false;
			loading_store.set_loading(false);
			piStatus_store.$reset();
			image_store.$reset();
			websocket_store.closeWS();
			if (message) snackError({ message });
			if (router.currentRoute.name !== 'login') router.push('/login');
		}
	}
});
