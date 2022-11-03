import { defineStore } from 'pinia';
import { FrontendRoutes } from '@/types/enum_routes';
import { ModuleName } from '@/types/enum_module';
import { piStatusModule, loadingModule, websocketModule, imageModule } from '@/store';
import { useRoute, useRouter } from 'vue-router';
import { snackError } from '@/services/snack';

export const userModule = defineStore(ModuleName.USER, {

	state: () => ({
		authenticated: false,
		api_version: '',
	}),

	actions: {
	
		async logout (message?: string): Promise<void> {
			this.authenticated = false;
			loadingModule().set_loading(false);
			piStatusModule().$reset();
			imageModule().$reset();
			websocketModule().closeWS();
			if (message) snackError({ message });
			const router = useRouter();
			const route = useRoute();
			if (route?.name !== 'login') router.push(FrontendRoutes.LOGIN);
		},

		set_api_version (value: string) {
			this.api_version = value;
		},

		set_authenticated (value: boolean) {
			this.authenticated = value;
		},
	}
});
