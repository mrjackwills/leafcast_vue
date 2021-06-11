import { Module, VuexModule, Mutation, Action, getModule } from 'vuex-module-decorators';
import { ModuleName } from '@/types/enum_module';
import store from '@/store/vuex_setup';

@Module({ store, name: ModuleName.Loading, dynamic: true, })
class Loading extends VuexModule {
	private _loading = false

	get loading (): boolean {
		return this._loading;
	}

	@Mutation
	private mutate_loading (b: boolean): void {
		this._loading = b;
	}

	@Action
	dispatch_loading (b: boolean): void {
		this.mutate_loading(b);
	}
}

export default getModule(Loading);