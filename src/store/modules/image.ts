import { defineStore } from 'pinia';
import { ModuleName } from '@/types/enum_module';

export const imageModule = defineStore(ModuleName.IMAGE, {

	state: () => ({
		cached: false,
		image: '',
		imageSize_compressed: 0,
		imageSize_original: 0,
		timestamp: '',
		updateCountdown: 300,
	}),

	getters: {
		
		get_image () :string {
			return this.imageExists ? `data:image/webp;base64,${this.image}` : '';
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

		set_imageSize_compressed (b: number): void {
			this.imageSize_compressed = b;
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
