import { snackError, snackReset } from './snack';
import { UserModule, WSModule, } from '@/store';
import Axios, { AxiosInstance } from 'axios';

// const wsAuthAxios = Axios.create({
// 	baseURL: process.env.VUE_APP_WSAUTH_DOMAIN,
// 	withCredentials: true,
// 	headers: {
// 		'Accept': 'application/json',
// 		'Content-Type': 'application/json; charset=utf-8',
// 		'Cache-control': 'no-cache'
// 	},
// });

// for (const i of [ wsAuthAxios ]) {
// 	i.interceptors.response.use(
// 		(config) => Promise.resolve(config),
// 		(error) => error.response ? Promise.reject(error) : Promise.reject(new Error('offline'))
// 	);
// }

const wrap = <T> () => {
	return function (_target: AxiosRequests, _propertyKey: string, descriptor: PropertyDescriptor): void {
		const original = descriptor.value;
		descriptor.value = async function (t: T): Promise<void> {
			try {
				const result = await original.call(this, t);
				return result;
			} catch (e) {
				if (e.message === 'offline') snackError({ message: 'server offline' });
				else if (e.response?.status === 403) {
					if (UserModule.authenticated) UserModule.dispatch_logout();
					WSModule.dispatch_closeWS();
					snackError({ message: 'invalid password' });
				} else if (e.response?.status === 429) {
					const converted = Math.ceil(e.response.data.response / 1000);
					const message = `too many requests - please try again in ${converted} seconds `;
					snackError({ message });
				} else {
					snackError({ message: e?.response?.data?.response });
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
		const { data } = await this.#wsAuthAxios.post('/', { key: process.env.VUE_APP_APIKEY, password });
		if (data.response) {
			snackReset();
			UserModule.dispatch_authenticated(true);
			WSModule.dispatch_openWs(data?.response);
		}
		return !!data.response;
	}
}

export const axiosRequests = new AxiosRequests(<string>process.env.VUE_APP_WSAUTH_DOMAIN);