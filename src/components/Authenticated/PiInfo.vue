<template>

	<v-row v-intersect='onIntersect' class='align-center justify-center ga-0'>

		<DisplayRows :to-display='piInfo' />

		<v-col id='update-button' class='' cols='12'>

			<v-row class='ma-0 pa-0 align-center justify-center'>

				<v-col class='ma-0 pa-0' cols='auto'>

					<v-btn
						class=' fab-fix elevation-0'
						:color='piOnline ? "serious" : ""'
						:disabled='loading || !piOnline'
						rounded
						size='small'
						:variant='!piOnline ? "outlined" : "flat"'
						@click='refresh'
					>
						<v-row class='ma-0 pa-0 align-center justify-space-around'>
							<v-col class='ma-0 pa-0' cols='auto'>
								<v-icon class='mr-1'>{{ mdiCameraFlip }}</v-icon>
							</v-col>

							<v-col id='pi-info' class='ma-0 pa-0' cols='auto'>
								update
							</v-col>
						</v-row>

					</v-btn>
				</v-col>
			</v-row>
		</v-col>
	</v-row>
</template>

<script setup lang='ts'>

import type { TDataToDisplay } from '@/types'
import { mdiCameraFlip, mdiDesktopClassic, mdiHarddisk, mdiImageMultiple, mdiLanConnect, mdiLanguageRust, mdiSourceBranch, mdiWebClock } from '@mdi/js'
import { convert_bytes } from '@/vanillaTS/convertBytes'
import { secondsToText } from '@/vanillaTS/secondsToText'

const [loadingStore, piStatusStore] = [loadingModule(), piStatusModule()]
onBeforeUnmount(() => {
	clearTimeout(goToTimeout.value)
})

const internalIp = computed(() => piStatusStore.internalIp)
const loading = computed(() => loadingStore.loading)
const connectedFor = computed(() => piStatusStore.connectedFor)
const appUptime = computed(() => piStatusStore.appUptime)
const uptime = computed(() => piStatusStore.uptime)
const piOnline = computed(() => piStatusStore.online)
const piVersion = computed(() => piStatusStore.piVersion)

const piInfo = computed((): TDataToDisplay => {
	const cached = piOnline.value ? `` : `[ cached ]`
	const output = [
		[
			{
				icon: mdiSourceBranch,
				text: 'pi software version',
				value: piVersion.value ?? '',
			},
			{
				icon: mdiLanConnect,
				text: `internal ip`,
				value: internalIp.value ?? '',
				extra: cached,
			},
		],
	]
	if (piOnline.value) {
		output.push([
			{
				icon: mdiDesktopClassic,
				text: 'pi uptime',
				value: secondsToText(uptime.value ? uptime.value * 1000 : 0),
			},
			{
				icon: mdiLanguageRust,
				text: 'app uptime',
				value: secondsToText(appUptime.value ? appUptime.value * 1000 : 0),
			},
		], [
			{
				icon: mdiWebClock,
				text: 'websocket uptime',
				value: secondsToText(connectedFor.value ? connectedFor.value * 1000 : 0),
			},
		])
	}
	output.push([
		{
			icon: mdiImageMultiple,
			text: 'number of images',
			value: `${numberFiles.value}`,
			extra: cached,
		},
		{
			icon: mdiHarddisk,
			text: 'total file size',
			value: convert(totalFileSize.value),
			extra: cached,
		},

	])
	return output
})
const numberFiles = computed(() => piStatusStore.numberImages)
const totalFileSize = computed(() => piStatusStore.totalFileSize)

const goToTimeout = ref(0)
const isIntersecting = ref(false)

function convert (amount: string | number): string {
	const converted = convert_bytes(amount)
	return `${converted.total} ${converted.unit}`
}
function onIntersect (entries: Array<IntersectionObserverEntry>): void {
	isIntersecting.value = !!entries[0]?.isIntersecting
}
const emit = defineEmits(['refresh'])
function refresh (): void {
	if (loading.value) return
	emit('refresh')
}

</script>
