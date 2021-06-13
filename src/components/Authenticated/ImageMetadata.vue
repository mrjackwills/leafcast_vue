<template>

	<v-row justify='center' align='center' class='mt-3' no-gutters>
		
		<app-display-rows :toDisplay='piInfo' />
		
	</v-row>
</template>

<script lang='ts'>

import Vue from 'vue';
import { secondsToText } from '@/vanillaTS/secondsToText';
import { ImageModule } from '@/store';
import { convert_bytes } from '@/vanillaTS/convertBytes';
import { mdiClock, mdiUpdate, mdiAlertCircle, mdiImageSizeSelectLarge, mdiImage, mdiCameraFlip } from '@mdi/js';
import DisplayRows from '@/components/DisplayRows.vue';

import { TDataToDisplay } from '@/types';

export default Vue.extend({
	name: 'image-metadata-component',

	components: {
		AppDisplayRows: DisplayRows
	},

	computed: {
		imageSize_compressed () : number|undefined {
			return ImageModule.imageSize_compressed;
		},
		imageSize_original (): number|undefined {
			return ImageModule.imageSize_original;
		},
		timestamp (): number|undefined {
			return ImageModule.timestamp;
		},
		intervalToHMS () :string {
			return secondsToText(this.updateCountdown*1000);
		},
		piInfo (): TDataToDisplay {
			return [
				[
					{
						icon: mdiClock,
						text: 'taken',
						value: this.timestamp? new Date(this.timestamp).toString().substring(0, 24):'',
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
		updateCountdown (): number {
			return ImageModule.updateCountdown;
		},
	},

	data: () => ({
		mdiClock,
		mdiAlertCircle,
		mdiCameraFlip,
		mdiUpdate,
	}),

	methods: {
		convert_bytes (amount: string|number):string {
			const a = convert_bytes(amount);
			return `${a.total} ${a.unit}`;
		},
	},

});
</script>