<template>

	<v-col cols='12' class='ma-0 pa-0'>

		<v-row class='ma-0 pa-0 align-center justify-center'>

			<v-col cols='auto' class='ma-0 pa-0'>

				<v-row no-gutters class='pulse-animation align-center justify-space-between'>

					<v-col cols='auto' class='ma-0 pa-0'>
						<v-icon dense color='white' class='mr-1' :size='mobile ? "small" : "default"'
							:icon='mdiAlertCircle' />
					</v-col>

					<v-col cols='auto' class='ma-0 pa-0'>
						<span class='text-white unselectable'>pi offline</span>
					</v-col>

				</v-row>

			</v-col>

		</v-row>
	</v-col>

</template>

<script setup lang='ts'>
import { mdiAlertCircle } from '@mdi/js';
import { useDisplay } from 'vuetify';
const { mobile } = useDisplay();

</script>
