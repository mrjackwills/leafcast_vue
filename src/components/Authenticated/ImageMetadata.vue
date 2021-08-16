<template>

	<v-row justify='center' align='center' class='mt-3' no-gutters>
		
		<app-pi-offline v-if='!piOnline && init' />
		
		<app-display-rows :toDisplay='piInfo' />
		
	</v-row>
</template>

<script lang='ts'>

import Vue from 'vue';
import { secondsToText } from '@/vanillaTS/secondsToText';
import { ImageModule, PiStatusModule } from '@/store';
import { convert_bytes } from '@/vanillaTS/convertBytes';
import { mdiClock, mdiUpdate, mdiImageSizeSelectLarge, mdiImage } from '@mdi/js';
import DisplayRows from '@/components/Authenticated/DisplayRows.vue';
import PiOffline from '@/components/Authenticated/PiOffline.vue';

import { TDataToDisplay } from '@/types';

export default Vue.extend({
	name: 'image-metadata-component',

	components: {
		AppDisplayRows: DisplayRows,
		AppPiOffline: PiOffline
	},

	computed: {
		imageSize_compressed (): number|undefined {
			return ImageModule.imageSize_compressed;
		},
		imageSize_original (): number|undefined {
			return ImageModule.imageSize_original;
		},
		init ():boolean {
			return PiStatusModule.init;
		},
		intervalToHMS (): string {
			return secondsToText(this.updateCountdown*1000);
		},
		ddd (): string {
			if (!this.timestamp) return '';
			return this.formatDate(this.timestamp);
		},
		piOnline (): boolean {
			return PiStatusModule.online;
		},
		piInfo (): TDataToDisplay {
			return [
				[
					{
						icon: mdiClock,
						text: 'taken',
						// This is why?
						// TODO fix this
						value: this.ddd,
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
			return ImageModule.timestamp ? new Date(ImageModule.timestamp) : undefined;
		},
		updateCountdown (): number {
			return ImageModule.updateCountdown;
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
			return `${this.dayOptions[data.getDay()]} ${data.getFullYear()}-${this.zeroPad(data.getMonth() + 1)}-${this.zeroPad(data.getDate())} @ ${this.zeroPad(data.getHours())}:${this.zeroPad(data.getMinutes())}:${this.zeroPad(data.getSeconds())}`;
		},

		zeroPad (unit: number): string {
			return String(unit).padStart(2, '0');
		}
		
	},

});
</script>