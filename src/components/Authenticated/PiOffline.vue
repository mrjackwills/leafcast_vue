<template>
		
	<v-col cols='12' class='ma-0 pa-0'>
		
		<v-row align='center' justify ='center' class='ma-0 pa-0'>

			<v-col cols='auto' class='ma-0 pa-0'>

				<v-row justify='space-between' align='center' no-gutters class='pulse-animation'>

					<v-col cols='auto' class='ma-0 pa-0'>
						<v-icon dense color='white' class='mr-1' :small='$vuetify.breakpoint.smAndDown'>{{ mdiAlertCircle }}</v-icon>
					</v-col>

					<v-col cols='auto' class='ma-0 pa-0' >
						<span class='white--text' >pi offline</span>
					</v-col>
						
				</v-row>

			</v-col>
		
		</v-row>
	</v-col>
		
</template>

<script lang='ts'>

import Vue from 'vue';
import { mdiAlertCircle } from '@mdi/js';

export default Vue.extend({
	name: 'pi-offline-component',

	data: () => ({
		mdiAlertCircle,
	}),

});
</script>