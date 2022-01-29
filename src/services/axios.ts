import { env } from '@/vanillaTS/env';
import { snackError, snackReset } from './snack';
import { userModule, websocketModule } from '@/store';
import Axios, { AxiosError, AxiosInstance } from 'axios';

const wrap = <T> () => {
	return function (_target: AxiosRequests, _propertyKey: string, descriptor: PropertyDescriptor): void {
		const original = descriptor.value;
		descriptor.value = async function (t: T): Promise<void> {
			try {
				const result = await original.call(this, t);
				return result;
			} catch (err) {
				const e = <AxiosError>err;
				const user_store = userModule();
				const websocket_store = websocketModule();
				if (e.message === 'offline') snackError({ message: 'server offline' });
				else if (e.response?.status === 429) {
					const converted = Math.ceil(e.response.data.response / 1000);
					const message = `too many requests - please try again in ${converted} seconds `;
					snackError({ message });
				} else {
					if (user_store.authenticated) user_store.logout();
					websocket_store.closeWS();
					snackError({ message: 'authentication error' });
				}
			}
		};
	};
};

class AxiosRequests {

	#wsAuthAxios!: AxiosInstance

	constructor (wsAuthUrl: string) {
		this.#wsAuthAxios = Axios.create({
			baseURL: wsAuthUrl,
			withCredentials: true,
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json; charset=utf-8',
				'Cache-control': 'no-cache'
			},
		});
		this.#wsAuthAxios.interceptors.response.use(
			(config) => Promise.resolve(config),
			(error) => !error.response ? Promise.reject(new Error('offline')) : Promise.reject(error)
		);
		
	}

	@wrap()
	async wsAuth_post (password: string): Promise<boolean> {
		const { data } = await this.#wsAuthAxios.post('/', { key: env.api_key, password });
		if (data.response) {
			snackReset();
			const user_store = userModule();
			const websocket_store = websocketModule();
			user_store.set_authenticated(true);
			websocket_store.openWs(data?.response);
		}
		return !!data.response;
	}
}

export const axiosRequests = new AxiosRequests(env.domain_auth);