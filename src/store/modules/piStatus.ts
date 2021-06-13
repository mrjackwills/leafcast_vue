import { Module, VuexModule, Mutation, Action, getModule } from 'vuex-module-decorators';
import { ModuleName } from '@/types/enum_module';
import { su, nu } from '@/types';
import store from '@/store/vuex_setup';

@Module({ store, name: ModuleName.Pistatus, namespaced: true, dynamic: true, })
class PiStatus extends VuexModule {
	private _init = false
	private _piVersion: su = undefined
	private _internalIp: su = undefined
	private _numberImages = 0
	private _online = false
	private _piNodeUptime: nu = undefined
	private _piUptime: nu = undefined
	private _totalFileSize = ''
	// totalFileSize
	// numberImages

	get init (): boolean {
		return this._init;
	}
	get piVersion (): su {
		return this._piVersion;
	}
	get internalIp (): su {
		return this._internalIp;
	}
	get numberImages (): number {
		return this._numberImages;
	}
	get online (): boolean {
		return this._online;
	}
	get piNodeUptime (): nu {
		return this._piNodeUptime;
	}
	get piUptime (): nu {
		return this._piUptime;
	}
	get totalFileSize (): string {
		return this._totalFileSize;
	}
	
	@Mutation
	private mutate_init (b: boolean): void {
		this._init = b;
	}
	@Mutation
	private mutate_piVersion (su: su): void {
		this._piVersion = su;
	}
	@Mutation
	private mutate_internalIp (su: su): void {
		this._internalIp = su;
	}
	@Mutation
	private mutate_numberImages (nu: number): void {
		this._numberImages = nu;
	}
	@Mutation
	private mutate_online (b: boolean): void {
		this._online = b;
		this._init = true;
	}
	@Mutation
	private mutate_piNodeUptime (nu: nu): void {
		this._piNodeUptime = nu;
	}
	@Mutation
	private mutate_piUptime (nu: nu): void {
		this._piUptime = nu;
	}
	@Mutation
	private mutate_totalFileSize (s: string): void {
		this._totalFileSize = s;
	}

	@Action
	dispatch_init (b: boolean): void {
		this.mutate_init(b);
	}
	@Action
	dispatch_piVersion (su: su): void {
		this.mutate_piVersion(su);
	}
	@Action
	dispatch_internalIp (su: su): void {
		this.mutate_internalIp(su);
	}
	@Action
	dispatch_numberImages (nu: number): void {
		this.mutate_numberImages(nu);
	}
	@Action
	dispatch_online (b: boolean): void {
		this.mutate_online(b);
	}
	@Action
	dispatch_piNodeUptime (nu: nu): void {
		this.mutate_piNodeUptime(nu);
	}
	@Action
	dispatch_piUptime (nu: nu): void {
		this.mutate_piUptime(nu);
	}
	@Action
	dispatch_totalFileSize (s: string): void {
		this.mutate_totalFileSize(s);
	}

	@Action
	dispatch_clear () :void {
		this.mutate_init(false);
		this.mutate_internalIp(undefined);
		this.mutate_numberImages(0);
		this.mutate_online(false);
		this.mutate_piVersion(undefined);
		this.mutate_piNodeUptime(undefined);
		this.mutate_piUptime(undefined);
		this.mutate_totalFileSize('');
	}
}

export default getModule(PiStatus);