import { defineStore } from 'pinia';
import { snackError } from '@/services/snack';
import { ModuleName } from '@/types/enum_module';
import { router } from '@/router';

import { piStatusModule, loadingModule, websocketModule, imageModule } from '@/store';

export const userModule = defineStore(ModuleName.User, {

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
			this.authenticated = false;
			loadingModule().set_loading(false);
			piStatusModule().$reset();
			imageModule().$reset();
			websocketModule().closeWS();
			if (message) snackError({ message });
			if (router.currentRoute.name !== 'login') router.push('/login');
		}
	}
});
