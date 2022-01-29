<template>

	<v-row justify='center' align='center' class='' no-gutters v-intersect='onIntersect'>
		
		<app-display-rows :toDisplay='piInfo' />

		<v-col cols='12' class='mt-2' id='update-button'>

			<v-row align='center' justify='center' class='ma-0 pa-0'>

				<v-col cols='auto' class='ma-0 pa-0'>

					<v-btn
						@click='refresh'
						:disabled='loading'
						class=' fab-fix elevation-0'
						color='serious'
						dark
						rounded
						small
					>
						<v-row align='center' justify='space-around' class='ma-0 pa-0'>
							<v-col cols='auto' class='ma-0 pa-0'>
								<v-icon class='mr-1'>{{ mdiCameraFlip }}</v-icon>
							</v-col>
							<v-col cols='auto' class='ma-0 pa-0' id='pi-info'>
								update
							</v-col>
						</v-row>

					</v-btn>
				</v-col>
			</v-row>
		</v-col>
	</v-row>
</template>

<script lang='ts'>

import Vue from 'vue';

import { convert_bytes } from '@/vanillaTS/convertBytes';
import { loadingModule, piStatusModule } from '@/store';
import { mapStores } from 'pinia';
import { mdiAlertCircleOutline, mdiCameraFlip, mdiDesktopClassic, mdiHarddisk, mdiImageMultiple, mdiLanConnect, mdiNodejs, mdiSourceBranch } from '@mdi/js';
import { secondsToText } from '@/vanillaTS/secondsToText';
import { TDataToDisplay } from '@/types';
import DisplayRows from '@/components/Authenticated/DisplayRows.vue';

export default Vue.extend({
	name: 'pi-info-component',

	beforeDestroy () {
		clearTimeout(this.goToTimeout);
	},

	components: {
		appDisplayRows: DisplayRows
	},

	computed: {
		...mapStores(loadingModule, piStatusModule),
		internalIp (): string {
			return this.piStatusStore.internalIp;
		},
		loading (): boolean {
			return this.loadingStore.loading;
		},
		nodeUptime (): number {
			return this.piStatusStore.nodeUptime;
		},
		uptime (): number {
			return this.piStatusStore.uptime;
		},
		piOnline (): boolean {
			return this.piStatusStore.online;
		},
		piVersion (): string {
			return this.piStatusStore.piVersion;
		},
		piInfo (): TDataToDisplay {
			const cached = this.piOnline? `` : `[ cached ]`;
			const output = [ [
				{
					icon: mdiSourceBranch,
					text: 'pi software version',
					value: this.piVersion??''
				},
				{
					icon: mdiLanConnect,
					text: `internal ip`,
					value: this.internalIp??'',
					extra: cached
				},
			] ];
			if (this.piOnline) {
				output.push([

					{
						icon: mdiDesktopClassic,
						text: 'pi uptime',
						value: secondsToText(this.uptime? this.uptime*1000: 0),
					},
					{
						icon: mdiNodejs,
						text: 'node uptime',
						value: secondsToText(this.nodeUptime? this.nodeUptime*1000:0),
					}
				]);
			}
			output.push([
				{
					icon: mdiImageMultiple,
					text: 'number of images',
					value: `${this.numberFiles}`,
					extra: cached
				},
				{
					icon: mdiHarddisk,
					text: 'total file size',
					value: this.convert_bytes(this.totalFileSize),
					extra: cached
				}, ]
			);
			return output;
		},
		numberFiles (): number {
			return this.piStatusStore.numberImages;
		},
		totalFileSize (): string {
			return this.piStatusStore.totalFileSize;
		}
	},

	data: () => ({
		goToTimeout: 0,
		isIntersecting: false,
		mdiAlertCircleOutline,
		mdiCameraFlip,
	}),

	methods: {
		convert_bytes (amount: string|number):string {
			const converted = convert_bytes(amount);
			return `${converted.total} ${converted.unit}`;
		},
		onIntersect (entries: Array<IntersectionObserverEntry>, _observer: IntersectionObserver): void {
			this.isIntersecting = !!entries[0]?.isIntersecting;
		},
		refresh ():void {
			if (this.loading) return;
			this.$emit('refresh');
		}
	},

	watch: {
		isIntersecting (i) {
			if (!i) return;
			this.goToTimeout = window.setTimeout(() => {
				this.$vuetify.goTo(`#footer`, { duration: 50 });
			}, 75);
			
		}
	}
});
</script>