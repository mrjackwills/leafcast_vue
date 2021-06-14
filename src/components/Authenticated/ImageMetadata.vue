<template>

	<v-row justify='center' align='center' class='mt-3' no-gutters>
		
		<!-- <v-col cols='12' class='ma-0 pa-0' v-if='!piOnline'>
		
			<v-row align='center' justify ='center' class='ma-0 pa-0'>

				<v-col cols='auto' class='ma-0 pa-0'>

					<v-row justify='space-between' align='center' no-gutters class='pulse-animation'>

						<v-col cols='auto' class='ma-0 pa-0'>
							<v-icon dense color='white' class='mr-1' :small='$vuetify.breakpoint.smAndDown'>{{ mdiAlertCircle }}</v-icon>
						</v-col>

						<v-col cols='auto' class='ma-0 pa-0' >
							<span class='white--text' >pi offline</span>
						</v-col>
						
					</v-row>

				</v-col>
		
			</v-row>
		</v-col> -->
		<app-pi-offline v-if='!piOnline' />
		
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
		piOnline () :boolean {
			return PiStatusModule.online;
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

	methods: {
		convert_bytes (amount: string|number):string {
			const a = convert_bytes(amount);
			return `${a.total} ${a.unit}`;
		},
	},

});
</script>