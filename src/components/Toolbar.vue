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
				class='ml-4 unselectable'
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

				<v-tooltip
					color='#000000'
					top
				>
					<template v-slot:activator='{ on, attrs }'>
						<v-icon
							v-bind='attrs'
							v-on='on'
							:large='$vuetify.breakpoint.mdAndUp'
							color='offwhite'
							class='mr-4'
						>
							{{ icon }}
						</v-icon>
					</template>

					<span>{{ tooltipText }}</span>
				</v-tooltip>
	
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
import { mdiWifiArrowUpDown, mdiWifiStrengthAlertOutline } from '@mdi/js';

export default Vue.extend({
	name: 'Toolbar-component',

	components: {
	},

	computed: {
		authenticated (): boolean {
			return UserModule.authenticated;
		},
		icon () :string {
			return this.piOnline ? mdiWifiArrowUpDown : mdiWifiStrengthAlertOutline ;
		},
		init () :boolean {
			return PiStatusModule.init;
		},
		loading (): boolean {
			return LoadingModule.loading;
		},
		logoWidth ():string {
			return this.$vuetify.breakpoint.mdAndUp ? '55px' : '40px';
		},
		piOnline ():boolean {
			return PiStatusModule.online;
		},
		spacing (): string {
			return this.$vuetify.breakpoint.xsOnly? 'text-h6 py-2' : 'text-h4 py-4';
		},
		toolbarHeight (): string {
			return this.$vuetify.breakpoint.xsOnly ? '56' : '70';
		},
		tooltipText () :string {
			return this.piOnline ? 'connected to pi' : 'pi offline';
		}
	
	},

	data: () => ({
	})
});
</script>

<style scoped>
#toolbar {
	border-radius: 3rem 3rem 0 0;
}
</style>