import { defineStore } from 'pinia';
import { ModuleName } from '@/types/enum_module';

export const loadingModule = defineStore(ModuleName.Loading, {

	state: () => ({
		loading: false,
	}),

	actions: {
		set_loading (value: boolean) {
			this.loading = value;
		},
	}
});
