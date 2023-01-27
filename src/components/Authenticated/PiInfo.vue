<template>

	<v-row justify='center' align='center' class='' no-gutters v-intersect='onIntersect'>
		
		<DisplayRows :toDisplay='piInfo' />

		<v-col cols='12' class='mt-2' id='update-button'>

			<v-row align='center' justify='center' class='ma-0 pa-0'>

				<v-col cols='auto' class='ma-0 pa-0'>

					<v-btn
						@click='refresh'
						:disabled='loading||!piOnline'
						:color='piOnline?"serious":""'
						:variant='!piOnline?"outlined":"flat"'
						class=' fab-fix elevation-0'
						size='small'
						rounded
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

<script setup lang='ts'>

import { convert_bytes } from '@/vanillaTS/convertBytes';
import { mdiCameraFlip, mdiDesktopClassic, mdiHarddisk, mdiImageMultiple, mdiLanConnect, mdiLanguageRust, mdiSourceBranch, mdiWebClock } from '@mdi/js';
import { secondsToText } from '@/vanillaTS/secondsToText';
import type { TDataToDisplay } from '@/types';
import DisplayRows from '@/components/Authenticated/DisplayRows.vue';

const [ loadingStore, piStatusStore ] = [ loadingModule(), piStatusModule() ];
onBeforeUnmount(() => {
	clearTimeout(goToTimeout.value);
});

const internalIp= computed((): string => {
	return piStatusStore.internalIp;
});
const loading= computed((): boolean => {
	return loadingStore.loading;
});
const connectedFor= computed((): number => {
	return piStatusStore.connectedFor;
});
const appUptime= computed((): number => {
	return piStatusStore.appUptime;
});
const uptime= computed((): number => {
	return piStatusStore.uptime;
});
const piOnline= computed((): boolean => {
	return piStatusStore.online;
});
const piVersion= computed((): string => {
	return piStatusStore.piVersion;
});

const piInfo = computed((): TDataToDisplay => {
	const cached = piOnline.value? `` : `[ cached ]`;
	const output = [ [
		{
			icon: mdiSourceBranch,
			text: 'pi software version',
			value: piVersion.value ??''
		},
		{
			icon: mdiLanConnect,
			text: `internal ip`,
			value: internalIp.value??'',
			extra: cached
		},
	] ];
	if (piOnline.value) {
		output.push(
			[
				{
					icon: mdiDesktopClassic,
					text: 'pi uptime',
					value: secondsToText(uptime.value? uptime.value*1000: 0),
				},
				{
					icon: mdiLanguageRust,
					text: 'app uptime',
					value: secondsToText(appUptime.value? appUptime.value*1000:0),
				},
			],
			[
				{
					icon: mdiWebClock,
					text: 'websocket uptime',
					value: secondsToText(connectedFor.value? connectedFor.value*1000:0),
				}
			]
		);
	}
	output.push([
		{
			icon: mdiImageMultiple,
			text: 'number of images',
			value: `${numberFiles.value}`,
			extra: cached
		},
		{
			icon: mdiHarddisk,
			text: 'total file size',
			value: convert(totalFileSize.value),
			extra: cached
		},
				
	]
	);
	return output;
});
const numberFiles = computed((): number => {
	return piStatusStore.numberImages;
});
const totalFileSize = computed((): string => {
	return piStatusStore.totalFileSize;
});

const goToTimeout = ref(0);
const isIntersecting = ref(false);

const convert = (amount: string|number):string => {
	const converted = convert_bytes(amount);
	return `${converted.total} ${converted.unit}`;
};
const onIntersect = (entries: Array<IntersectionObserverEntry>, _observer: IntersectionObserver): void => {
	isIntersecting.value = !!entries[0]?.isIntersecting;
};
const emit = defineEmits([ 'refresh' ]);
const refresh = ():void => {
	if (loading.value) return;
	emit('refresh');
};

</script>