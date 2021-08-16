import { Action, getModule, Module, Mutation, VuexModule, } from 'vuex-module-decorators';
import { ModuleName } from '@/types/enum_module';
import { su, nu } from '@/types';
import store from '@/store/vuex_setup';

@Module({ store, name: ModuleName.Snackbar, namespaced: true, dynamic: true, })
class Snackbar extends VuexModule {
	private _loading = false
	private _icon: su = undefined
	private _message: su = undefined
	private _timeout: nu = undefined
	private _visible = false

	get loading (): boolean {
		return this._loading;
	}
	get icon (): su {
		return this._icon;
	}
	get message (): su {
		return this._message;
	}
	get timeout (): nu {
		return this._timeout;
	}
	get visible (): boolean {
		return this._visible;
	}

	@Mutation
	private mutate_loading (b: boolean): void {
		this._loading = b;
	}
	@Mutation
	private mutate_icon (su: su): void {
		this._icon = su;
	}
	@Mutation
	private mutate_message (su: su): void {
		this._message = su;
	}
	@Mutation
	private mutate_timeout (nu: nu): void {
		this._timeout = nu;
	}
	@Mutation
	private mutate_visible (b: boolean): void {
		this._visible = b;
	}

	@Action
	dispatch_loading (b: boolean): void {
		this.mutate_loading(b);
	}
	@Action
	dispatch_icon (su: su): void {
		this.mutate_icon(su);
	}
	@Action
	dispatch_message (su: su): void {
		this.mutate_message(su);
	}
	@Action
	dispatch_timeout (nu: nu): void {
		this.mutate_timeout(nu);
	}
	@Action
	dispatch_visible (b: boolean): void {
		this.mutate_visible(b);
	}
	@Action
	dispatch_reset (): void {
		this.mutate_loading(false);
		this.mutate_icon(undefined);
		this.mutate_message(undefined);
		this.mutate_timeout(undefined);
		this.mutate_visible(false);
	}
}

export default getModule(Snackbar);