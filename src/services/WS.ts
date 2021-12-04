import { userModule } from '@/store';

export class CreateWs {
	#ws?: WebSocket

	get connection (): undefined | WebSocket {
		const user_store = userModule();
		return user_store.authenticated ? this.#ws : undefined;
	}

	openWs (password: string): void {
		const user_store = userModule();
		if (user_store.authenticated && process.env.VUE_APP_WSS_ADDRESS && process.env.VUE_APP_APIKEY) {
			this.#ws = new WebSocket(`${process.env.VUE_APP_WSS_ADDRESS}/${password}`, [ process.env.VUE_APP_APIKEY ]);
		}
	}

	closeWs (): void {
		this.#ws?.close();
	}
}

export const ws = new CreateWs();