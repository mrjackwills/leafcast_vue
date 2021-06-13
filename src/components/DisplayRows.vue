<template>
	<v-col cols='11' sm='9'  xl='8' class='text-center white--text text--body-1 mt-2'>

		<section v-for='(row, index) in toDisplay' :key='index'>

			<v-row justify='space-between' align='center' class='unselectable' no-gutters>

				<v-col v-for='(item, rowIndex) in row' :key='rowIndex' cols='12' md='5' :class='{"ml-2" : rowIndex === 1 && $vuetify.breakpoint.mdAndUp  }'>

					<v-row justify='space-between' align='center' no-gutters>

						<v-col cols='auto' class='ma-0 pa-0'>
							<v-icon dense color='white' class='mr-1' :small='$vuetify.breakpoint.smAndDown'>{{ item.icon }}</v-icon><span class='white--text mr-2'>{{ item.text }}:</span>
						</v-col>

						<v-col cols='auto' class='ma-0 pa-0'  :class='{"mr-2" : rowIndex === 0 && $vuetify.breakpoint.mdAndUp}' >
							<span class='secondary--text' >{{ item.value }}</span><span v-if='item.extra' class='offwhite--text ml-1'>{{ item.extra }}</span>
						</v-col>
						
					</v-row>

					<app-divider class='hidden-md-and-up' v-if='rowIndex === 0 || index !== toDisplay.length -1' />

				</v-col>
				
			</v-row>
			
			<app-divider v-if='index + 1 !== toDisplay.length' class='hidden-sm-and-down' :cols='"12"' />

		</section>
	</v-col>
</template>

<script lang="ts">
import Vue from 'vue';
import { TDataToDisplay } from '@/types';
import Divider from '@/components/Divider.vue';
export default Vue.extend({
	name: 'data-row-component',

	components: {
		appDivider: Divider
	},

	data: () => ({}),
	
	props: {
		toDisplay: {
			type: Array as () => TDataToDisplay,
			required: true
		}
	}
});
</script>