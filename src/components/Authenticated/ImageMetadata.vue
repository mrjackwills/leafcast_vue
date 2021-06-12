<template>

	<v-row justify='center' align='center' class='mt-3' no-gutters>
		<v-col cols='12' md='9' lg='6' class='text-center white--text text--body-1'>

			<v-expand-transition>
				<section v-if='cached'>
					<v-row justify='center' align='center' class='' no-gutters>
						<v-col cols='auto' class='mr-2'>
							<v-icon medium color='white' >{{ mdiAlertCircle }}</v-icon>
						</v-col>
						<v-col cols='auto' class='white--text text-body-1'>
							pi offline
						</v-col>
					</v-row>
					<app-divider />
				</section>
			</v-expand-transition>
			
			<v-row justify='start' align='center' class='' no-gutters v-if='timestamp'>
				<v-col cols='auto' class='mr-2'>
					<v-icon dense color='white'>{{ mdiClock }}</v-icon>
				</v-col>
				<v-col cols='auto'>
					<span class='white--text mr-1'>taken at: </span><span class='secondary--text mr-1'>{{ new Date(timestamp).toString().substring(0,24) }}</span><span v-if='cached' class='offwhite--text' > ( {{ timestampToHMS }} ago )</span>
				</v-col>
			</v-row>
			
			<app-divider />

			<v-row justify='space-between' align='center' class='' no-gutters >
				<v-col cols='auto' class='ma-0 pa-0' v-for='(item, index) in imageSizeArray' :key='index'>

					<v-row justify='start' align='center' class='ma-0 pa-0' no-gutters >
						<v-col cols='auto' class='mr-2' v-if='item.icon'>
							<v-icon dense color='white'>{{ item.icon }}</v-icon>
						</v-col>
						<v-col cols='auto'>
							<span class='white--text mr-1'>{{ item.text }}:</span> <span class='secondary--text '>{{ item.value }}</span>
						</v-col>
				
					</v-row>
				</v-col>
				
			</v-row>

			<app-divider />

			<v-row justify='start' align='center' class='' no-gutters >
				<v-col cols='auto' class='mr-2'>
					<v-icon dense color='white'>{{ mdiUpdate }}</v-icon>
				</v-col>
				<v-col cols='auto'>
					<span class='white--text mr-1'>next update:</span> <span class='secondary--text '>{{ intervalToHMS }}</span>
				</v-col>

			</v-row>

		</v-col>
	</v-row>
</template>

<script lang='ts'>

import Vue from 'vue';
import { secondsToText } from '@/vanillaTS/secondsToText';
import { PiStatusModule, ImageModule } from '@/store';
import { convert_bytes } from '@/vanillaTS/convertBytes';
import { mdiClock, mdiUpdate, mdiAlertCircle, mdiImageSizeSelectLarge, mdiImage, mdiCameraFlip } from '@mdi/js';
import Divider from '@/components/Divider.vue';

export default Vue.extend({
	name: 'image-metadata-component',

	components: {
		appDivider: Divider
	},

	computed: {
		piInit (): boolean {
			return PiStatusModule.init;
		},
		timestampToHMS ():string {
			return this.timestamp ? secondsToText(Date.now()-this.timestamp) : '';
		},
		cached (): boolean {
			return ImageModule.cached;
		},
		imageSize_compressed () : number|undefined {
			return ImageModule.imageSize_compressed;
		},
		imageSize_original (): number|undefined {
			return ImageModule.imageSize_original;
		},
		timestamp (): number|undefined {
			return ImageModule.timestamp;
		},
		imageSizeArray () : Array<{icon: string, text: string, value: string}> {
			return [
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

			];
		},
		intervalToHMS () :string {
			return secondsToText(this.updateCountdown*1000);
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

<style>
</style>