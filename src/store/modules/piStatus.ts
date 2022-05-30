import { defineStore } from 'pinia';
import { ModuleName } from '@/types/enum_module';

export const piStatusModule = defineStore(ModuleName.PI_STATUS, {

	state: () => ({
		init: false,
		internalIp: '',
		nodeUptime: 0,
		numberImages: 0,
		online: false,
		piVersion: '',
		connectedFor: 0,
		totalFileSize: '',
		uptime: 0,
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

		set_nodeUptime (nu: number): void {
			this.nodeUptime = nu;
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
		},

	}
});
