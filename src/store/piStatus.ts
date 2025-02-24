import { defineStore } from 'pinia';
import { ModuleName } from '@/types/const_module';

export const piStatusModule = defineStore(ModuleName.PI_STATUS, {

	state: () => ({
		connectedFor: 0,
		init: false,
		internalIp: '',
		appUptime: 0,
		numberImages: 0,
		online: false,
		piVersion: '',
		totalFileSize: '',
		uptime: 0
	}),

	actions: {

		set_connectedFor (b: number): void {
			this.connectedFor = b;
		},

		set_init (b: boolean): void {
			this.init = b;
		},

		set_internalIp (su: string): void {
			this.internalIp = su;
		},

		set_appUptime (nu: number): void {
			this.appUptime = nu;
		},

		set_numberImages (nu: number): void {
			this.numberImages = nu;
		},

		set_online (b: boolean): void {
			this.online = b;
		},
		
		set_piVersion (su: string): void {
			this.piVersion = su;
		},

		set_totalFileSize (s: string): void {
			this.totalFileSize = s;
		},
		
		set_uptime (nu: number): void {
			this.uptime = nu;
		}

	}
});
