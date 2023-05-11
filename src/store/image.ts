import { defineStore } from 'pinia';
import { ModuleName } from '@/types/enum_module';

export const imageModule = defineStore(ModuleName.IMAGE, {

	state: () => ({
		cached: false,
		image: '',
		imageSize_converted: 0,
		imageSize_original: 0,
		timestamp: '',
		updateCountdown: 300,
	}),

	getters: {
		
		get_image () :string {
			return this.imageExists ? this.image : '';
		},

		imageExists (): boolean {
			return !!this.image;
		},
	},

	actions: {
		set_cached (b: boolean): void {
			this.cached = b;
		},

		set_image (b: string): void {
			this.image = b;
		},

		set_imageSize_converted (b: number): void {
			this.imageSize_converted = b;
		},

		set_imageSize_original (b: number): void {
			this.imageSize_original = b;
		},

		set_timestamp (s: string): void {
			this.timestamp = s;
		},
		
		set_updateCountdown (b: number): void {
			this.updateCountdown = b;
		}
	}
});
