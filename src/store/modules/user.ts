import { Action, getModule, Module, Mutation, VuexModule, } from 'vuex-module-decorators';
import { ModuleName } from '@/types/enum_module';
import { PiStatusModule, WSModule } from '@/store';
import { snackError } from '@/services/snack';
import router from '@/router';
import store from '@/store/vuex_setup';

@Module({ dynamic: true, store, name: ModuleName.User, namespaced: true })
class UserModule extends VuexModule {
	private _authenticated = false
	private _api_version = ''

	get authenticated (): boolean {
		return this._authenticated;
	}
	get api_version (): string {
		return this._api_version;
	}

	@Mutation
	mutate_authenticated (b: boolean): void {
		this._authenticated = b;
	}
	@Mutation
	mutate_api_version (s: string): void {
		this._api_version = s;
	}

	@Action
	dispatch_authenticated (b: boolean): void {
		this.mutate_authenticated(b);
	}
	@Action
	dispatch_api_version (s: string): void {
		this.mutate_api_version(s);
	}
	@Action
	async dispatch_logout (message?: string): Promise<void> {
		this.mutate_authenticated(false);
		PiStatusModule.dispatch_clear();
		WSModule.dispatch_closeWS();
		if (message) snackError({ message });
		if (router.currentRoute.name !== 'login') router.push('/login');
	}
}

export default getModule(UserModule);