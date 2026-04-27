<template>

	<v-row class='mt-3 ga-0 align-center justify-center'>

		<PiOffline v-if='!piOnline && init' />

		<DisplayRows :to-display='piInfo' />

	</v-row>
</template>

<script setup lang='ts'>

import type { TDataToDisplay } from '@/types'
import { mdiClock, mdiImage, mdiImageSizeSelectLarge, mdiUpdate } from '@mdi/js'
import { convert_bytes } from '@/vanillaTS/convertBytes'
import { nextUpdateToText } from '@/vanillaTS/secondsToText'

const [imageStore, piStatusStore] = [imageModule(), piStatusModule()]

const imageSize_converted = computed(() => imageStore.imageSize_converted)
const imageSize_original = computed(() => imageStore.imageSize_original)
const init = computed(() => piStatusStore.init)
const intervalToHMS = computed(() => nextUpdateToText(updateCountdown.value * 1000))
const piOnline = computed(() => piStatusStore.online)
const piInfo = computed((): TDataToDisplay => [
	[
		{
			icon: mdiClock,
			text: 'taken',
			value: timestamp.value,
		},
		{
			icon: mdiUpdate,
			text: 'next update',
			value: intervalToHMS.value,
		},
	],

	[
		{
			icon: mdiImage,
			text: 'original size',
			value: convert(imageSize_original.value ?? 0),
		},
		{
			icon: mdiImageSizeSelectLarge,
			text: 'compressed size',
			value: convert(imageSize_converted.value ?? 0),
		},
	],
])
const timestamp = computed(() => imageStore.timestamp)
const updateCountdown = computed(() => imageStore.updateCountdown)

function convert (amount: string | number): string {
	const a = convert_bytes(amount)
	return `${a.total} ${a.unit}`
}

</script>
