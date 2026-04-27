<template>
	<section>
		<v-toolbar
			id='toolbar'
			app
			color='secondary'
			dark
			flat
			:height='toolbarHeight'
		>
			<v-img class='ml-5 mr-2' :max-width='logoWidth' src='@/assets/logo.svg' />

			<v-row class='pa-0 ma-0 align-center justify-start'>
				<v-col class='unselectable' cols='auto'>
					<span class='text-headline-large text-offwhite'>Leafcast</span>
				</v-col>

				<v-spacer />

				<v-col v-if='authenticated && init' class='mr-5' cols='auto'>
					<v-icon color='offwhite' :icon :size='mdAndUp ? "large" : "default"' />
				</v-col>
			</v-row>

			<v-progress-linear
				v-if='loading'
				absolute
				bg-color='primary'
				color='offwhite'
				:indeterminate='loading'
				location='bottom center'
			/>
		</v-toolbar>

	</section>
</template>

<script setup lang='ts'>

import { mdiWifiArrowUpDown, mdiWifiStrengthAlertOutline } from '@mdi/js'
import { useDisplay } from 'vuetify'
const { mdAndUp, xs } = useDisplay()

const [loadingStore, piStatusStore, userStore] = [loadingModule(), piStatusModule(), userModule()]

const authenticated = computed(() => userStore.authenticated)
const icon = computed(() => piOnline.value ? mdiWifiArrowUpDown : mdiWifiStrengthAlertOutline)
const init = computed(() => piStatusStore.init)
const loading = computed(() => loadingStore.loading)
const logoWidth = computed(() => mdAndUp.value ? '55px' : '40px')
const piOnline = computed(() => piStatusStore.online)
const toolbarHeight = computed(() => xs.value ? '56' : '70')

</script>

<style scoped>
#toolbar {
	border-radius: 3rem 3rem 0 0;
}
</style>
