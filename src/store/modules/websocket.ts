import { TWSToServer } from '@/types';
import { Module, VuexModule, Mutation, Action, getModule } from 'vuex-module-decorators';
import { ModuleName } from '@/types/enum_module';
import { UserModule } from '@/store';
import { ws } from '@/services/WS';
import store from '@/store/vuex_setup';

@Module({ store, name: ModuleName.Websocket, namespaced: true, dynamic: true })
class WS extends VuexModule {
	private _connected = false

	get connected (): boolean {
		return this._connected;
	}

	@Mutation
	private mutate_connected (b: boolean): void {
		this._connected = b;
	}

	@Action
	dispatch_openWs (password: string): void {
		if (!UserModule.authenticated) return;
		ws.openWs(password);
		ws?.connection?.addEventListener('open', () => {
			this.dispatch_connected(true);
		});
	}
	@Action
	dispatch_connected (b: boolean) : void {
		this.mutate_connected(b);
	}
	@Action
	dispatch_closeWS (): void {
		this.mutate_connected(false);
		ws?.connection?.removeEventListener('message', undefined);
		ws?.connection?.close();
	}
	@Action
	dispatch_send (data: TWSToServer) : void {
		ws?.connection?.send(JSON.stringify({ data, unique: true }));
	}
	@Action
	dispatch_ping () : void {
		ws.connection?.send('PING');
	}
}

export default getModule(WS);