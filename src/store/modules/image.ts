import { Action, getModule, Module, Mutation, VuexModule, } from 'vuex-module-decorators';
import { ModuleName } from '@/types/enum_module';
import store from '@/store/vuex_setup';

@Module({ store, name: ModuleName.Image, dynamic: true, })
class Loading extends VuexModule {
	private _cached = false
	private _image = ''
	private _imageSize_compressed?: number
	private _imageSize_original?: number
	private _timestamp?: string
	private _updateCountdown = 300

	get cached (): boolean {
		return this._cached;
	}
	get image (): string {
		return this._image ? `data:image/webp;base64,${this._image}` : '';
	}
	get imageExists (): boolean {
		return !!this._image;
	}
	get timestamp (): string|undefined {
		return this._timestamp;
	}
	get imageSize_compressed (): number|undefined {
		return this._imageSize_compressed;
	}
	get imageSize_original (): number|undefined {
		return this._imageSize_original;
	}
	get updateCountdown (): number {
		return this._updateCountdown;
	}

	@Mutation
	private mutate_cached (b: boolean): void {
		this._cached = b;
	}
	@Mutation
	private mutate_image (b: string): void {
		this._image = b;
	}
	@Mutation
	private mutate_imageSize_compressed (b: number): void {
		this._imageSize_compressed = b;
	}
	@Mutation
	private mutate_imageSize_original (b: number): void {
		this._imageSize_original = b;
	}
	@Mutation
	private mutate_timestamp (s: string): void {
		this._timestamp = s;
	}
	@Mutation
	private mutate_updateCountdown (b: number): void {
		this._updateCountdown = b;
	}

	@Action
	dispatch_cached (b: boolean): void {
		this.mutate_cached(b);
	}
	@Action
	dispatch_image (b: string): void {
		this.mutate_image(b);
	}
	@Action
	dispatch_imageSize_compressed (b: number): void {
		this.mutate_imageSize_compressed(b);
	}
	@Action
	dispatch_imageSize_original (b: number): void {
		this.mutate_imageSize_original(b);
	}
	@Action
	dispatch_timestamp (s: string): void {
		this.mutate_timestamp(s);
	}
	@Action
	dispatch_updateCountdown (b: number): void {
		this.mutate_updateCountdown(b);
	}
}

export default getModule(Loading);