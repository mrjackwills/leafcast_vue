import { Action, getModule, Module, Mutation, VuexModule, } from 'vuex-module-decorators';
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
	private _nodeUptime: nu = undefined
	private _uptime: nu = undefined
	private _totalFileSize = ''

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
	get nodeUptime (): nu {
		return this._nodeUptime;
	}
	get uptime (): nu {
		return this._uptime;
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
	}
	@Mutation
	private mutate_nodeUptime (nu: nu): void {
		this._nodeUptime = nu;
	}
	@Mutation
	private mutate_uptime (nu: nu): void {
		this._uptime = nu;
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
	dispatch_nodeUptime (nu: nu): void {
		this.mutate_nodeUptime(nu);
	}
	@Action
	dispatch_uptime (nu: nu): void {
		this.mutate_uptime(nu);
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
		this.mutate_nodeUptime(undefined);
		this.mutate_uptime(undefined);
		this.mutate_totalFileSize('');
	}
}

export default getModule(PiStatus);