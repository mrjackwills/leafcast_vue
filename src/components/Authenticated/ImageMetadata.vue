<template>

	<v-row justify='center' align='center' class='mt-3' no-gutters>
		
		<app-pi-offline v-if='!piOnline && init' />
		
		<app-display-rows :toDisplay='piInfo' />
		
	</v-row>
</template>

<script lang='ts'>

import Vue from 'vue';

import { convert_bytes } from '@/vanillaTS/convertBytes';
import { imageModule, piStatusModule } from '@/store';
import { mapStores } from 'pinia';
import { mdiClock, mdiUpdate, mdiImageSizeSelectLarge, mdiImage } from '@mdi/js';
import { nextUpdateToText } from '@/vanillaTS/secondsToText';
import { TDataToDisplay } from '@/types';
import { zeroPad } from '@/vanillaTS/zeropad';
import DisplayRows from '@/components/Authenticated/DisplayRows.vue';
import PiOffline from '@/components/Authenticated/PiOffline.vue';

export default Vue.extend({
	name: 'image-metadata-component',

	components: {
		AppDisplayRows: DisplayRows,
		AppPiOffline: PiOffline
	},

	computed: {
		...mapStores(imageModule, piStatusModule),

		imageSize_compressed (): number|undefined {
			return this.imageStore.imageSize_compressed;
		},
		imageSize_original (): number|undefined {
			return this.imageStore.imageSize_original;
		},
		init ():boolean {
			return this.piStatusStore.init;
		},
		intervalToHMS (): string {
			return nextUpdateToText(this.updateCountdown*1000);
		},
		formattedTimestamp (): string {
			if (!this.timestamp) return '';
			return this.formatDate(this.timestamp);
		},
		piOnline (): boolean {
			return this.piStatusStore.online;
		},
		piInfo (): TDataToDisplay {
			return [
				[
					{
						icon: mdiClock,
						text: 'taken',
						value: this.formattedTimestamp,
					},
					{
						icon: mdiUpdate,
						text: 'next update',
						value: this.intervalToHMS,
					},
				],

				[
					{
						icon: mdiImage,
						text: 'original size',
						value: this.convert_bytes(this.imageSize_original??0)
					},
					{
						icon: mdiImageSizeSelectLarge,
						text: 'compressed size',
						value: this.convert_bytes(this.imageSize_compressed??0)
					}
				]
			];
		},
		timestamp (): Date|undefined {
			return this.imageStore.timestamp ? new Date(this.imageStore.timestamp) : undefined;
		},
		updateCountdown (): number {
			return this.imageStore.updateCountdown;
		},
	},

	data: () => ({
		dayOptions: [
			'Sunday',
			'Monday',
			'Tuesday',
			'Wednesday',
			'Thursday',
			'Friday',
			'Saturday',
		] as const
	}),

	methods: {
		convert_bytes (amount: string|number):string {
			const a = convert_bytes(amount);
			return `${a.total} ${a.unit}`;
		},

		formatDate (data: Date): string {
			return `${this.dayOptions[data.getDay()]} ${data.getFullYear()}-${zeroPad(data.getMonth() + 1)}-${zeroPad(data.getDate())} @ ${zeroPad(data.getHours())}:${zeroPad(data.getMinutes())}:${zeroPad(data.getSeconds())}`;
		},
		
	},

});
</script>