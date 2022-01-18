import { defineStore } from 'pinia';
import { ModuleName } from '@/types/enum_module';
import { userModule } from '@/store';
import { TWSToServer } from '@/types';
import { ws } from '@/services/WS';

export const websocketModule = defineStore(ModuleName.Websocket, {

	state: () => ({
		connected: false
	}),

	actions: {
		set_connected (b: boolean): void {
			this.connected = b;
		},

		openWs (password: string): void {
			if (!userModule().authenticated) return;
			ws.openWs(password);
			ws.connection?.addEventListener('open', () => {
				this.set_connected(true);
			});
		},

		closeWS (): void {
			this.set_connected(false);
			ws.closeWs();
		},

		send (data: TWSToServer): void {
			ws.connection?.send(JSON.stringify({ data, unique: true }));
		},

	}
});
