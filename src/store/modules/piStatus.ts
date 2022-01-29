import { defineStore } from 'pinia';
import { ModuleName } from '@/types/enum_module';

export const piStatusModule = defineStore(ModuleName.PI_STATUS, {

	state: () => ({
		init: false,
		piVersion: '',
		internalIp: '',
		numberImages: 0,
		online: false,
		nodeUptime: 0,
		uptime: 0,
		totalFileSize: '',
	}),

	actions: {
		set_init (b: boolean): void {
			this.init = b;
		},
		
		set_piVersion (su: string): void {
			this.piVersion = su;
		},
		
		set_internalIp (su: string): void {
			this.internalIp = su;
		},
		
		set_numberImages (nu: number): void {
			this.numberImages = nu;
		},
		
		set_online (b: boolean): void {
			this.online = b;
		},
		
		set_nodeUptime (nu: number): void {
			this.nodeUptime = nu;
		},
		
		set_uptime (nu: number): void {
			this.uptime = nu;
		},
		
		set_totalFileSize (s: string): void {
			this.totalFileSize = s;
		},

	}
});
