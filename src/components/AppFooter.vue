<template>
	<v-footer id='footer' absolute app color='transparent'>
		<v-row class='no-gutters ma-0 pa-0 mt-3 align-center justify-center'>

			<v-col class='no-gutters unselectable ma-0 pa-0' cols='auto'>

				<v-chip
					class='not-cl elevation-0'
					color='offwhite'
					pill
					:ripple='false'
					variant='flat'
				>
					<section v-if='showBuild' class='text-body-small' @click='buildInfo'>
						<span>site version: {{ env.app_version }}</span>
						<span class='ml-3 '>built: {{ env.build_date }}</span>
					</section>

					<section v-else>
						<a :href='env.homepage' rel='noopener noreferrer' target='_blank'>
							<v-icon class='mr-2' color='black' :icon='mdiGithub' />
						</a>

						<span @click='buildInfo'>
							mrjackwills 2021 -
						</span>
					</section>

				</v-chip>
			</v-col>
		</v-row>

	</v-footer>
</template>

<script setup lang='ts'>

import { mdiGithub } from '@mdi/js'
import { env } from '@/vanillaTS/env'

const userStore = userModule()

onBeforeUnmount(() => {
	clearTimeout(buildTimeout.value)
})
const authenticated = computed(() => userStore.authenticated)

const buildTimeout = ref(0)
const showBuild = ref(false)

/**
 ** Show build date on version number click if authed
 */
function buildInfo (): void {
	if (!authenticated.value) return
	showBuild.value = !showBuild.value
	clearTimeout(buildTimeout.value)
	if (showBuild.value) buildTimeout.value = window.setTimeout(() => {
		showBuild.value = false
	}, 5000)
}

watch(authenticated, i => {
	if (!i) showBuild.value = false
})
</script>

<style scoped>
.lowercase-button {
	text-transform: lowercase;
}

a {
	color: #000000 !important;
}
</style>
