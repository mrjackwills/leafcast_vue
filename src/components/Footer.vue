<template>
	<v-footer
		color='transparent'
		id='footer'
	>
		<v-row justify='center' align='center' class='no-gutters ma-0 pa-0'>

			<v-col cols='auto' class='no-gutters unselectable ma-0 pa-0'>
				
				<v-chip
					:ripple='false'
					class='not-cl elevation-0'
					color='offwhite'
					pill
				>
					<section v-if='showBuild' class='text-caption' @click='buildInfo'>
						<span>site version: {{ appVersion }}</span>
						<span class='ml-3 '>built: {{ buildDate }}</span>
					</section>

					<section v-else>
						<template>
							<a :href='href' target='_blank' rel='noopener noreferrer' clas='fff'>
								<v-icon color='black' class='mr-2' href=''>
									{{ mdiGithub }}
								</v-icon>
							</a>
						</template>
						<span @click='buildInfo'>
							mrjackwills 2021-
						</span>
					</section>
					
				</v-chip>
			</v-col>
		</v-row>
			
	</v-footer>
</template>

<script lang='ts'>

import Vue from 'vue';

import { env } from '@/vanillaTS/env';
import { mapStores } from 'pinia';
import { mdiGithub } from '@mdi/js';
import { userModule } from '@/store';

export default Vue.extend({
	name: 'home-component',

	async beforeDestroy () {
		clearTimeout(this.buildTimeout);
	},

	computed: {
		...mapStores(userModule),
		authenticated (): boolean {
			return this.userStore.authenticated;
		},
		href (): string {
			return env.github.split('leafcast')[0] ?? '';
		}
	},

	data: () => ({
		appVersion: env.app_version,
		buildDate: env.build_date,
		buildTimeout: 0,
		showBuild: false,
		mdiGithub,
	}),

	methods: {
		/**
		 ** Show build date on version number click if authed
		 */
		buildInfo (): void {
			if (!this.authenticated) return;
			this.showBuild = !this.showBuild;
			clearTimeout(this.buildTimeout);
			if (this.showBuild) this.buildTimeout = window.setTimeout(() => {
				this.showBuild = false;
			}, 5000);
		},
	},

	watch: {
		/**
		 ** Watch authenticated, remove showbuild when logout
		 */
		authenticated (i: boolean): void {
			if (!i) this.showBuild = false;
		}
	},
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