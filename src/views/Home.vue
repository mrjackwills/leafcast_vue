<template>
	<section class='fill-height'>

		<v-row justify='center' align='center' class='align-center minh' no-gutters v-if='!imageExists'>
			<v-col cols='auto'>
				<v-progress-circular indeterminate />
			</v-col>
		</v-row>

		<v-fade-transition>
			<v-row v-if='imageExists' justify='center' align='center' class='align-center' no-gutters>

				<v-col cols='12'>
					<app-image />
				</v-col>

				<v-col cols='12'>
					<app-image-metadata @refresh='refresh' />
				</v-col>

				<v-col cols='auto' class='my-2'>
					<v-btn
						@click='goVideo'
						class=''
						color='lip elevation-0'
						:disabled='loading'
						dark
						small
						rounded
					>
						<v-row align='center' justify='center' class='ma-0 pa-0'>
							<v-col cols='auto' class='ma-0 pa-0'>
								<v-icon class='mr-2'>{{ mdiVideo }}</v-icon>
							</v-col>
							<v-col cols='auto' class='ma-0 pa-0'>
								videos
							</v-col>
						</v-row>
					</v-btn>
				</v-col>

				<v-col cols='auto' class='my-2'>
					<v-btn
						@click='piInfo'
						class=''
						color='secondary elevation-0 ml-2'
						dark
						small
						rounded
					>
						<v-row align='center' justify='center' class='ma-0 pa-0'>
							<v-col cols='auto' class='ma-0 pa-0'>
								<v-icon class='mr-1'>{{ infoIcon }}</v-icon>
							</v-col>
							<v-col cols='auto' class='ma-0 pa-0'>
								pi info
							</v-col>
						</v-row>
					</v-btn>
				</v-col>

				<v-col cols='12'>
					<v-expand-transition>
						<app-pi-info v-if='showPiInfo' @refresh='refresh' />
					</v-expand-transition>
				</v-col>

			</v-row>
		</v-fade-transition>
	</section>
</template>

<script lang='ts'>
import Vue from 'vue';

import { imageModule, loadingModule, piStatusModule, userModule, websocketModule } from '@/store';
import { mapStores } from 'pinia';
import { mdiChevronDown, mdiChevronUp, mdiVideo } from '@mdi/js';
import { MetaInfo } from 'vue-meta';
import { parseMessage } from '@/vanillaTS/messageParser';
import { snackError } from '@/services/snack';
import { TWSFromPi } from '@/types';
import { ws } from '@/services/WS';
import Image from '@/components/Authenticated/Image.vue';
import ImageMetadata from '@/components/Authenticated/ImageMetadata.vue';
import PiInfo from '@/components/Authenticated/PiInfo.vue';

export default Vue.extend({
	name: 'home-view',

	components: {
		appImage: Image,
		appImageMetadata: ImageMetadata,
		appPiInfo: PiInfo,
	},

	async beforeDestroy () {
		this.clearAllIntervals();
	},

	computed: {
		...mapStores(imageModule, loadingModule, piStatusModule, userModule, websocketModule),
		imageExists (): boolean {
			return this.imageStore.imageExists;
		},
		infoIcon (): string {
			return this.showPiInfo ? mdiChevronUp: mdiChevronDown;
		},
		loading: {
			get (): boolean {
				return this.loadingStore.loading;
			},
			set (b: boolean): void {
				this.loadingStore.set_loading(b);
			}
		},
		nodeUptime: {
			get: function (): number {
				return this.piStatusStore.nodeUptime;
			},
			set: function (n: number): void {
				this.piStatusStore.set_nodeUptime(n);
			}
		},
		uptime: {
			get: function (): number {
				return this.piStatusStore.uptime;
			},
			set: function (n: number): void {
				this.piStatusStore.set_uptime(n);
			}
		},
		init: {
			get: function (): boolean {
				return this.piStatusStore.init;
			},
			set: function (b: boolean): void {
				this.piStatusStore.set_init(b);
			}
		},
		updateCountdown: {
			get: function (): number {
				return this.imageStore.updateCountdown;
			},
			set: function (s: number): void {
				this.imageStore.set_updateCountdown(s);
			}
		},
		ws_connected (): boolean {
			return this.websocketStore.connected;
		},
	},

	data: () => ({
		initCount: 0,
		initTimeout: 0,
		pageTitle: '',
		pingInterval: 0,
		showPiInfo: false,
		updateInterval: 0,
		mdiVideo
	}),

	metaInfo (): MetaInfo {
		return {
			title: this.pageTitle
		};
	},

	methods: {

		/**
		 * Create handlers for all ws events
		 */
		addWSHandlers (): void {
			ws.connection?.addEventListener('message', (data) => {
				try {
					const message = parseMessage(data.data);
					if (!message) throw Error(`can't parse message`);
					this.wsDataHandler(message);
				} catch (e) {
					const message = e instanceof Error ? e.message : 'ERROR';
					snackError({ message });
				}
			});

			this.sendPhoto();

			// PING sever every 30 seconds, to keep client side connection alive
			this.pingInterval = window.setInterval(() => {
				this.websocketStore.ping();
			}, 1000 * 30);
			
			// Although should never have the connection killed
			ws.connection?.addEventListener('close', (_event) => {
				this.userStore.logout();
			});
		},

		/**
		 * Clear clock interval and re-connect interval
		 */
		clearAllIntervals (): void {
			clearInterval(this.pingInterval);
			clearInterval(this.updateInterval);
			clearInterval(this.initTimeout);
			this.updateCountdown = 300;
		},

		/**
		 * close websocket, set ws and connected to false, remove all listeners, reconnect after 1.5 second
		 */
		closeWS (): void {
			if (!this.ws_connected) return;
			this.websocketStore.closeWS();
		},

		/**
		* If a message isn't received within the first 3500ms(x4) of being mounted, logout
		* */
		initCheck (): void {
			this.initCount ++;
			this.loading = true;
			this.initTimeout = window.setTimeout(() => {
				if (this.init) {
					clearInterval(this.initTimeout);
					this.loading = false;
				}
				else if (this.initCount < 4) {
					this.sendPhoto();
					this.initCheck();
				}
				else this.userStore.logout('unable to contact pi');
			}, 3500);
		},

		goVideo (): void {
			this.$router.push('/video');
		},

		piInfo ():void {
			this.showPiInfo = !this.showPiInfo;
		},

		refresh (): void {
			if (this.loading) return;
			if (!this.websocketStore.connected) this.userStore.logout;
			this.loading = true;
			this.clearAllIntervals();
			this.websocketStore.send({ message: 'force-update' });
			this.startInterval();
		},

		sendPhoto (): void {
			this.loading = true;
			this.websocketStore.send({ message: 'photo' });
		},

		startInterval (): void {
			clearInterval(this.updateInterval);
			this.updateInterval = window.setInterval(() => {
				this.updateCountdown --;
				if (this.nodeUptime) this.nodeUptime ++;
				if (this.uptime) this.uptime ++;

				if (this.updateCountdown === 1) this.sendPhoto();
				if (this.updateCountdown === 0) this.updateCountdown = 300;
			}, 1000);
		},
		
		/**
		 * Handle all incoming messages from server
		 * @param {Object} data parsed ws data , contains name and optional body
 		*/
		async wsDataHandler (message: TWSFromPi): Promise<void> {
			
			// TODO switch case for errors
			// Maybe just logout?
			switch (message.data?.message) {
			case 'photo':
				this.imageStore.set_cached(!!message.cache);
				this.imageStore.set_image(message.data.data.image ?? '');
				this.imageStore.set_imageSize_compressed(message.data.data.imageSize_compressed??0);
				this.imageStore.set_imageSize_original(message.data.data.imageSize_original??0);
				this.imageStore.set_timestamp(message.data.data.timestamp);
				this.piStatusStore.set_internalIp(message.data.data.piInfo.internalIp);
				this.piStatusStore.set_numberImages(message.data.data.piInfo.numberImages);
				this.piStatusStore.set_online(!message.cache);
				this.piStatusStore.set_piVersion(message.data.data.piInfo.piVersion);
				this.piStatusStore.set_totalFileSize(message.data.data.piInfo.totalFileSize);
				this.uptime = message.data.data.piInfo.uptime;
				this.nodeUptime = message.data.data.piInfo.nodeUptime;
				if (!this.init) this.startInterval();
				this.initCount = 0;
				this.init = true;
				this.loading = false;
				break;
			}
		},
	},

	mounted () {
		this.initCheck();
	},

	watch: {
		ws_connected (i): void {
			if (i) {
				this.addWSHandlers();
			}
		},
	},

});
</script>

<style>

.minh{
	min-height: 300px;
}
</style>
