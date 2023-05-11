import { defineStore, getActivePinia } from 'pinia';
import { FrontendRoutes } from '@/types/enum_routes';
import { ModuleName } from '@/types/enum_module';
import { snackError } from '@/services/snack';

export const userModule = defineStore(ModuleName.USER, {

	state: () => ({
		api_version: '',
		authenticated: false,
	}),

	actions: {
	
		async logout (message?: string): Promise<void> {
			this.authenticated = false;
			loadingModule().set_loading(false);
			piStatusModule().$reset();
			imageModule().$reset();
			websocketModule().closeWS();
			if (message) snackError({ message });
			const router = getActivePinia()?.router();
			const route = router?.currentRoute;
			if (route?.value.name !== 'login') router?.push(FrontendRoutes.LOGIN);
		},

		set_api_version (value: string) {
			this.api_version = value;
		},

		set_authenticated (value: boolean) {
			this.authenticated = value;
		},
	}
});
