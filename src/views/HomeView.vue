<template>
	<section class='full-height'>

		<v-row v-if='!imageExists' class='align-center minh justify-center'>
			<v-col cols='auto'>
				<v-progress-circular indeterminate />
			</v-col>
		</v-row>

		<v-fade-transition>
			<v-row v-if='imageExists' class='align-center justify-center ga-0'>

				<v-col cols='12'>
					<app-image />
				</v-col>

				<v-col cols='12'>
					<ImageMetadata @refresh='refresh' />
				</v-col>

				<v-col class='my-2' cols='auto'>
					<v-btn
						class=''
						color='secondary elevation-0 ml-2'
						dark
						rounded
						size='small'
						@click='showInfo'
					>
						<v-row class='ma-0 pa-0 align-center justify-center'>
							<v-col class='ma-0 pa-0' cols='auto'>
								<v-icon class='mr-1'>{{ infoIcon }}</v-icon>
							</v-col>

							<v-col class='ma-0 pa-0' cols='auto'>
								pi info
							</v-col>
						</v-row>
					</v-btn>
				</v-col>

				<v-col cols='12'>
					<v-expand-transition>
						<PiInfo v-if='showPiInfo' @refresh='refresh' />
					</v-expand-transition>
				</v-col>

			</v-row>
		</v-fade-transition>
	</section>
</template>

<script setup lang='ts'>

import type { TWSFromPi } from '@/types'
import { mdiChevronDown, mdiChevronUp } from '@mdi/js'
import { snackError } from '@/services/snack'
import { ws } from '@/services/WS'
import { parseMessage } from '@/vanillaTS/messageParser'

const [
	imageStore,
	loadingStore,
	piStatusStore,
	userStore,
	websocketStore,
] = [imageModule(), loadingModule(), piStatusModule(), userModule(), websocketModule()]

onBeforeUnmount(() => {
	clearAllIntervals()
})

const imageExists = computed(() => imageStore.imageExists)
const infoIcon = computed(() => showPiInfo.value ? mdiChevronUp : mdiChevronDown)
const loading = computed({
	get (): boolean {
		return loadingStore.loading
	},
	set (b: boolean): void {
		loadingStore.set_loading(b)
	},
})
const appUptime = computed({
	get (): number {
		return piStatusStore.appUptime
	},
	set (n: number): void {
		piStatusStore.set_appUptime(n)
	},
})
const connectedFor = computed({
	get (): number {
		return piStatusStore.connectedFor
	},
	set (n: number): void {
		piStatusStore.set_connectedFor(n)
	},
})
const uptime = computed({
	get (): number {
		return piStatusStore.uptime
	},
	set (n: number): void {
		piStatusStore.set_uptime(n)
	},
})
const init = computed({
	get (): boolean {
		return piStatusStore.init
	},
	set (b: boolean): void {
		piStatusStore.set_init(b)
	},
})
const updateCountdown = computed({
	get (): number {
		return imageStore.updateCountdown
	},
	set (s: number): void {
		imageStore.set_updateCountdown(s)
	},
})
const ws_connected = computed(() => websocketStore.connected)

const initCount = ref(0)
const initTimeout = ref(0)
const showPiInfo = ref(false)
const updateInterval = ref(0)

/**
 * Create handlers for all ws events
 */
function addWSHandlers (): void {
	ws.connection?.addEventListener('message', data => {
		try {
			const message = parseMessage(data.data)
			if (!message) throw new Error(`can't parse message`)
			wsDataHandler(message)
		} catch (error) {
			const message = error instanceof Error ? error.message : 'ERROR'
			snackError({ message })
		}
	})

	sendPhoto()

	// Although should never have the connection killed
	ws.connection?.addEventListener('close', () => {
		userStore.logout()
	})
}

/**
 * Clear clock interval and re-connect interval
 *
 */
function clearAllIntervals (): void {
	clearInterval(updateInterval.value)
	clearInterval(initTimeout.value)
	updateCountdown.value = 300
}

/**
 * If a message isn't received within the first 3500ms(x4) of being mounted, logout
 *
 */
function initCheck (): void {
	initCount.value++
	loading.value = true
	initTimeout.value = window.setTimeout(() => {
		if (init.value) {
			clearInterval(initTimeout.value)
			loading.value = false
		} else if (initCount.value < 4) {
			sendPhoto()
			initCheck()
		} else userStore.logout('unable to contact pi')
	}, 3500)
}

function showInfo (): void {
	showPiInfo.value = !showPiInfo.value
}

function refresh (): void {
	if (loading.value) return
	if (!websocketStore.connected) userStore.logout()
	loading.value = true
	clearAllIntervals()
	websocketStore.send({ name: 'force_update' })
	startInterval()
}

function sendPhoto (): void {
	loading.value = true
	websocketStore.send({ name: 'photo' })
}

function startInterval (): void {
	clearInterval(updateInterval.value)
	updateInterval.value = window.setInterval(() => {
		updateCountdown.value--
		if (appUptime.value) appUptime.value++
		if (uptime.value) uptime.value++
		if (connectedFor.value) connectedFor.value++

		if (updateCountdown.value === 1) sendPhoto()
		if (updateCountdown.value === 0) updateCountdown.value = 300
	}, 1000)
}

/**
 * Handle all incoming messages from server
 * @param {Object} data parsed ws data , contains name and optional body
 * TODO switch case for errors
 * Maybe just logout?
 */
async function wsDataHandler (message: TWSFromPi): Promise<void> {
	switch (message.data?.name) {
		case 'photo': {
			imageStore.set_cached(!!message.cache)
			imageStore.set_image(message.data.data.image ?? '')
			imageStore.set_imageSize_converted(message.data.data.size_converted ?? 0)
			imageStore.set_imageSize_original(message.data.data.size_original ?? 0)
			imageStore.set_timestamp(message.data.data.timestamp)
			piStatusStore.set_internalIp(message.data.data.pi_info.internal_ip)
			piStatusStore.set_numberImages(message.data.data.pi_info.number_images)
			piStatusStore.set_online(!message.cache)
			piStatusStore.set_piVersion(message.data.data.pi_info.version)
			piStatusStore.set_totalFileSize(message.data.data.pi_info.total_file_size)
			if (piStatusStore.online) piStatusStore.set_connectedFor(message.data.data.pi_info.websocket_uptime)
			if (piStatusStore.online) uptime.value = message.data.data.pi_info.uptime
			if (piStatusStore.online) appUptime.value = message.data.data.pi_info.app_uptime
			if (!init.value) startInterval()
			initCount.value = 0
			init.value = true
			loading.value = false
			break
		}
	}
}

onMounted(() => {
	initCheck()
})

watch(ws_connected, i => {
	if (i) {
		addWSHandlers()
	}
})

</script>

<style>
.minh {
	min-height: 300px;
}
</style>
