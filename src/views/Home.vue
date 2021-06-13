<template>
	<section class='fill-height'>

		<v-row justify='center' align='center' class='align-center minh' no-gutters v-if='!imageExists'>
			<v-col cols='auto'>
				<v-progress-circular :indeterminate='true' />
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
						@click='piInfo'
						class=''
						color='secondary elevation-0'
						dark
						small
						rounded
					>
						<v-row align='center' justify='center' class='ma-0 pa-0' id=''>
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
						<app-pi-info v-if='showPiInfo' @refresh='refresh'  />
					</v-expand-transition>
				</v-col>

			</v-row>
		</v-fade-transition>
	</section>
</template>

<script lang='ts'>
import Vue from 'vue';

import { ImageModule, LoadingModule, PiStatusModule, UserModule, WSModule } from '@/store';
import { mdiChevronDown, mdiChevronUp } from '@mdi/js';
import { MetaInfo } from 'vue-meta';
import { TWSFromPi } from '@/types';
import { ws } from '@/services/WS';
import Image from '@/components/Authenticated/Image.vue';
import ImageMetadata from '@/components/Authenticated/ImageMetadata.vue';
import PiInfo from '@/components/Authenticated/PiInfo.vue';
import { parseMessage } from '@/vanillaTS/messageParser';
import { snackError } from '@/services/snack';

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
		imageExists (): boolean {
			return ImageModule.imageExists;
		},
		infoIcon () :string {
			return this.showPiInfo ? mdiChevronUp: mdiChevronDown;
		},
		loading: {
			get (): boolean {
				return LoadingModule.loading;
			},
			set (b: boolean): void {
				LoadingModule.dispatch_loading(b);
			}
		},
		nodeUptime: {
			get: function (): number|undefined {
				return PiStatusModule.nodeUptime;
			},
			set: function (s: number|undefined): void {
				PiStatusModule.dispatch_nodeUptime(s);
			}
		},
		uptime: {
			get: function (): number|undefined {
				return PiStatusModule.uptime;
			},
			set: function (s: number|undefined): void {
				PiStatusModule.dispatch_uptime(s);
			}
		},
		piInit (): boolean {
			return PiStatusModule.init;
		},
		updateCountdown: {
			get: function (): number {
				return ImageModule.updateCountdown;
			},
			set: function (s: number): void {
				ImageModule.dispatch_updateCountdown(s);
			}
		},
		ws_connected (): boolean {
			return WSModule.connected;
		},
	},

	data: () => ({
		init: false,
		pingInterval: 0,
		showPiInfo: false,
		updateInterval: 0,
		pageTitle: '',
		initTimeout: 0
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
		addHandlers (): void {
			ws?.connection?.addEventListener('message', (data) => {
				try {
					const message = parseMessage(data.data);
					if (!message) throw Error(`can't parse message`);
					this.wsDataHandler(message);
				} catch (e) {
					snackError(e);
				}

			});
			this.sendPhoto();

			// PING sever every 30 seconds, to keep client side connection alive
			this.pingInterval = window.setInterval(() => {
				WSModule.dispatch_ping();
			}, 1000 * 30);
			
			// Although should never have the connection killed
			ws?.connection?.addEventListener('close', (_event) => {
				UserModule.dispatch_logout();
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
			WSModule.dispatch_closeWS();
		},

		/**
		* If a message isn't received within the first 5000ms of being mounted, logout
		* */
		initCheck () : void {
			this.initTimeout = window.setTimeout(() => {
				if (this.init) {
					clearInterval(this.initTimeout);
				} else {
					UserModule.dispatch_logout('unable to contact pi');
				}
			}, 5000);
		},

		piInfo ():void {
			this.showPiInfo = !this.showPiInfo;
		},

		refresh (): void {
			if (this.loading) return;
			if (!WSModule.connected) UserModule.dispatch_logout();
			this.loading = true;
			this.clearAllIntervals();
			WSModule.dispatch_send({ message: 'force-update' });
			this.updateInit();
		},

		sendPhoto () :void {
			this.loading = true;
			WSModule.dispatch_send({ message: 'photo' });
		},

		updateInit () :void {
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
			
			PiStatusModule.dispatch_init(true);
			// TODO switch case for errors
			// Maybe just logout?
			switch (message.data?.message) {
			case 'photo':
				ImageModule.dispatch_cached(!!message.cache);
				ImageModule.dispatch_image(message.data.data.image ?? '');
				ImageModule.dispatch_imageSize_compressed(message.data.data.imageSize_compressed??0);
				ImageModule.dispatch_imageSize_original(message.data.data.imageSize_original??0);
				ImageModule.dispatch_timestamp(message.data.data.timestamp);
				PiStatusModule.dispatch_internalIp(message.data.data.piInfo.internalIp);
				PiStatusModule.dispatch_numberImages(message.data.data.piInfo.numberImages);
				PiStatusModule.dispatch_online(!message.cache);
				this.uptime = message.data.data.piInfo.uptime;
				this.nodeUptime = message.data.data.piInfo.nodeUptime;
				PiStatusModule.dispatch_piVersion(message.data.data.piInfo.piVersion);
				PiStatusModule.dispatch_totalFileSize(message.data.data.piInfo.totalFileSize);
				if (!this.init) this.updateInit();
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
				this.addHandlers();
			}
		},
	},

});
</script>

<style>

.minh{
	min-height: 240px;
}
</style>
