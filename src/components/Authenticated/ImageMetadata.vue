<template>

	<v-row justify='center' align='center' class='mt-3' no-gutters>

		<PiOffline v-if='!piOnline && init' />

		<DisplayRows :toDisplay='piInfo' />

	</v-row>
</template>

<script setup lang='ts'>

import { convert_bytes } from '@/vanillaTS/convertBytes';
import { mdiClock, mdiUpdate, mdiImageSizeSelectLarge, mdiImage } from '@mdi/js';
import { nextUpdateToText } from '@/vanillaTS/secondsToText';
import type { TDataToDisplay } from '@/types';

const [imageStore, piStatusStore] = [imageModule(), piStatusModule()];

const imageSize_converted = computed(() => imageStore.imageSize_converted);
const imageSize_original = computed(() => imageStore.imageSize_original);
const init = computed(() => piStatusStore.init);
const intervalToHMS = computed(() => nextUpdateToText(updateCountdown.value * 1000));
const piOnline = computed(() => piStatusStore.online);
const piInfo = computed((): TDataToDisplay => [
	[
		{
			icon: mdiClock,
			text: 'taken',
			value: timestamp.value
		},
		{
			icon: mdiUpdate,
			text: 'next update',
			value: intervalToHMS.value
		}
	],

	[
		{
			icon: mdiImage,
			text: 'original size',
			value: convert(imageSize_original.value ?? 0)
		},
		{
			icon: mdiImageSizeSelectLarge,
			text: 'compressed size',
			value: convert(imageSize_converted.value ?? 0)
		}
	]
]);
const timestamp = computed(() => imageStore.timestamp);
const updateCountdown = computed(() => imageStore.updateCountdown);

const convert = (amount: string | number): string => {
	const a = convert_bytes(amount);
	return `${a.total} ${a.unit}`;
};

</script>
