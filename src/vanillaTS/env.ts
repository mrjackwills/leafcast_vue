class Env {
	readonly #api_key = String(process.env.VUE_APP_APIKEY);
	readonly #app_version = String(process.env.VUE_APP_VERSION);
	readonly #build_date = String(process.env.VUE_APP_DATE);
	readonly #domain_auth = String(process.env.VUE_APP_WS_AUTH_DOMAIN);
	readonly #domain_wss = String(process.env.VUE_APP_WSS_ADDRESS);
	readonly #github = String(process.env.VUE_APP_GITHUB);
	readonly #production_mode = process.env.NODE_ENV === 'production';

	get api_key (): string {
		return this.#api_key;
	}

	get app_version (): string {
		return this.#app_version;
	}
	
	get domain_auth (): string {
		return this.#domain_auth;
	}

	get domain_wss (): string {
		return this.#domain_wss;
	}

	get build_date (): string {
		return this.#build_date;
	}

	get github (): string {
		return this.#github;
	}

	get production_mode (): boolean {
		return this.#production_mode;
	}
}

export const env = new Env();