<template>
	<v-app id='leafcast' class='ma-0 pa-0' container--fluid>
		<v-main>
			<v-container class='fill-height' fluid>
				<v-row class='fill-height align-center justify-center'>
					<v-col
						class='ma-0 pa-0 px-1'
						cols='12'
						lg='8'
						no-gutters
						sm='11'
					>
						<v-card
							id='main_card'
							class='pb-2 elevation-0 ma-0 pa-0'
							color='primary'
							round
							transition='fade-transition'
						>
							<AppToolbar />

							<v-card-text class=''>
								<router-view />
							</v-card-text>
						</v-card>
					</v-col>
				</v-row>
			</v-container>

		</v-main>

		<AppFooter />

		<AppSnackbar />
	</v-app>
</template>

<script setup lang='ts'>
import { useHead } from '@vueuse/head'
import { registerSW } from 'virtual:pwa-register'
import { useRegisterSW } from 'virtual:pwa-register/vue'
import { snackSuccess } from '@/services/snack'
const { updateServiceWorker } = useRegisterSW()

const userStore = userModule()

if ('serviceWorker' in navigator) {
	registerSW({
		onNeedRefresh () {
			appUpdate()
		},
	})
}

function appUpdate (): void {
	snackSuccess({
		message: 'Downloading Updates',
		loading: true,
		timeout: 5000,
	})
	window.setTimeout(() => updateServiceWorker(), 4500)
}

onMounted(() => {
	window.addEventListener('beforeinstallprompt', e => {
		e.preventDefault()
	})
	document.addEventListener('visibilitychange', visibilityChange)
})

const isHidden = ref(false)
const logoutTimeout = ref(0)

useHead({
	title: `Leafcast`,

	meta: [
		{
			name: `description`,
			content: `Leafcast - pi based plant camera`,
		},
	],
	link: [
		{
			rel: 'canonical',
			href: `https://plants.mrjackwills.com`,
		},
	],
})

// use vue core visibility here?
function visibilityChange (): void {
	isHidden.value = document.hidden
	if (isHidden.value) {
		logoutTimeout.value = window.setTimeout(() => {
			logout()
		}, 1000 * 60 * 7.5)
	} else {
		if (!userStore.authenticated) logout('')
		clearTimeout(logoutTimeout.value)
		logoutTimeout.value = 0
	}
}

function logout (message = 'you have been logged out'): void {
	userStore.logout(message)
}

</script>

<style>
.v-sheet.v-card.v-sheet {
	border-radius: 3rem;
}

#main_card {
	border-radius: 3rem;
}
</style>
