<template>
	<section>
		<v-toolbar
			:height='`${toolbarHeight}px`'
			id='toolbar'
			dark
			color='secondary'
			flat
		>
			<v-toolbar-title
				:class='spacing'
				class=' ml-4 unselectable'
			>

				<v-row align='center' justify='space-around' no-gutters class='pa-0 ma-0'>
					<v-col
						:class='$vuetify.breakpoint.mdAndUp ? "mr-2" : "mr-1"'
						cols='auto'
					>
						<v-img src='@/assets/logo.svg' :eager='true' :max-width='logoWidth' />
					</v-col>
					<v-col cols='auto' class='unselectable' >
						<span class='text-h4 offwhite--text'>Leafcast</span>
					</v-col>
				</v-row>
			
			</v-toolbar-title>

			<v-spacer />

			<section v-if='authenticated && init'>
				<v-icon :class='{"pulse-animation": !piOnline}' color='offwhite' class='mr-4' :large='$vuetify.breakpoint.mdAndUp'>{{ icon }}</v-icon>
			</section>

			<v-progress-linear
				:active='loading'
				:indeterminate='loading'
				color='offwhite'
				absolute
				bottom
			/>

		</v-toolbar>
	</section>
</template>

<script lang='ts'>

import Vue from 'vue';
import { LoadingModule, UserModule, PiStatusModule } from '@/store';
import { mdiWifi, mdiWifiOff } from '@mdi/js';

export default Vue.extend({
	name: 'Toolbar-component',

	components: {
	},

	computed: {
		authenticated (): boolean {
			return UserModule.authenticated;
		},
		loading (): boolean {
			return LoadingModule.loading;
		},
		logoWidth ():string {
			return this.$vuetify.breakpoint.mdAndUp ? '55px' : '40px';
		},
		init () :boolean {
			return PiStatusModule.init;
		},
		spacing (): string {
			return this.$vuetify.breakpoint.xsOnly? 'text-h6 py-2' : 'text-h4 py-4';
		},
		toolbarHeight (): string {
			return this.$vuetify.breakpoint.xsOnly ? '56' : '70';
		},
		piOnline ():boolean {
			return PiStatusModule.online;
		},
		icon () :string {
			return this.piOnline ? mdiWifi : mdiWifiOff;
		}
	},

	data: () => ({
		mdiWifi
	})
});
</script>

<style scoped>
#toolbar {
	border-radius: 3rem 3rem 0 0;
}
</style>