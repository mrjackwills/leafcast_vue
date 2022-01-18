import { userModule } from '@/store';
import { env } from '@/vanillaTS/env';

export class CreateWs {
	#ws?: WebSocket

	get connection (): undefined | WebSocket {
		const user_store = userModule();
		return user_store.authenticated ? this.#ws : undefined;
	}

	openWs (password: string): void {
		const user_store = userModule();
		if (user_store.authenticated) this.#ws = new WebSocket(`${env.domain_wss}/${password}`, [ env.api_key ]);
	}

	closeWs (): void {
		this.#ws?.close();
	}
}

export const ws = new CreateWs();