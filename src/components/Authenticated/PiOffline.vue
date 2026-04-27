<template>

	<v-col class='ma-0 pa-0' cols='12'>

		<v-row class='ma-0 pa-0 align-center justify-center'>

			<v-col class='ma-0 pa-0' cols='auto'>

				<v-row class='pulse-animation align-center justify-space-between' no-gutters>

					<v-col class='ma-0 pa-0' cols='auto'>
						<v-icon
							class='mr-1'
							color='white'
							dense
							:icon='mdiAlertCircle'
							:size='mobile ? "small" : "default"'
						/>
					</v-col>

					<v-col class='ma-0 pa-0' cols='auto'>
						<span class='text-white unselectable'>pi offline</span>
					</v-col>

				</v-row>

			</v-col>

		</v-row>
	</v-col>

</template>

<script setup lang='ts'>
import { mdiAlertCircle } from '@mdi/js'
import { useDisplay } from 'vuetify'
const { mobile } = useDisplay()

</script>
