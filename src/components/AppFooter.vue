<template>
	<v-footer
		color='transparent'
		id='footer'
		absolute
		app
		
	>
		<v-row justify='center' align='center' class='no-gutters ma-0 pa-0 mt-3'>

			<v-col cols='auto' class='no-gutters unselectable ma-0 pa-0'>
				
				<v-chip
					:ripple='false'
					class='not-cl elevation-0'
					color='offwhite'
					variant='flat'
					pill
				>
					<section v-if='showBuild' class='text-caption' @click='buildInfo'>
						<span>site version: {{ env.app_version }}</span>
						<span class='ml-3 '>built: {{ env.build_date }}</span>
					</section>

					<section v-else>
						<a :href='env.homepage' target='_blank' rel='noopener noreferrer'>
							<v-icon color='black' class='mr-2' :icon='mdiGithub' />
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

import { env } from '@/vanillaTS/env';
import { mdiGithub } from '@mdi/js';

const userStore = userModule();

onBeforeUnmount(() => {
	clearTimeout(buildTimeout.value);

});
const authenticated= computed((): boolean => {
	return userStore.authenticated;
});

const buildTimeout = ref(0);
const showBuild = ref(false);

/**
 ** Show build date on version number click if authed
 */
const buildInfo = (): void => {
	if (!authenticated.value) return;
	showBuild.value = !showBuild.value;
	clearTimeout(buildTimeout.value);
	if (showBuild.value) buildTimeout.value = window.setTimeout(() => {
		showBuild.value = false;
	}, 5000);
};

watch(authenticated, (i) => {
	if (!i) showBuild.value = false;
});
</script>

<style scoped>
.lowercase-button{
	text-transform: lowercase;
}

a {
	color: #000000!important;
}
</style>