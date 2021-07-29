import { UserModule } from '@/store';

export class CreateWs {
	#ws?: WebSocket

	get connection (): undefined | WebSocket {
		return UserModule.authenticated ? this.#ws : undefined;
	}

	openWs (password: string): void {
		if (UserModule.authenticated && process.env.VUE_APP_WSS_ADDRESS && process.env.VUE_APP_APIKEY) {
			this.#ws = new WebSocket(`${process.env.VUE_APP_WSS_ADDRESS}/${password}`, [ process.env.VUE_APP_APIKEY ]);
		}
	}
}

export const ws = new CreateWs();