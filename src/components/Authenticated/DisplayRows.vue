<template>
	<v-col class='text-center text-white text-body-large' cols='11' md='10'>

		<section v-for='(row, index) in toDisplay' :key='index'>

			<v-row class='align-center justify-space-between'>

				<v-col
					v-for='(item, rowIndex) in row'
					:key='rowIndex'
					:class='{ "ml-1": rowIndex === 1 && mdAndUp }'
					cols='12'
					md='5'
				>

					<v-row class='align-center justify-space-between'>

						<v-col class='ma-0 pa-0 unselectable' cols='auto'>
							<v-icon class='mr-1' color='white' density='compact' :size='mobile ? "small" : "default"'>{{
								item.icon }}</v-icon>

							<span class='text-white'>{{ item.text }}:</span>
						</v-col>

						<v-col class='ma-0 pa-0' :class='{ "mr-1": rowIndex === 0 && mdAndUp }' cols='auto'>
							<span
								class='text-secondary mono-numbers'
								:class='{ "unselectable": item.text !== "internal ip" }'
							>{{ item.value }}</span>

							<span v-if='item.extra' class='text-offwhite ml-2'>{{ item.extra }}</span>
						</v-col>

					</v-row>

					<app-divider v-if='rowIndex === 0 || index !== toDisplay.length - 1' class='hidden-md-and-up' />

				</v-col>

			</v-row>

			<AppDivider v-if='index + 1 !== toDisplay.length' class='hidden-sm-and-down' />

		</section>
	</v-col>
</template>

<script setup lang="ts">

import type { TDataToDisplay } from '@/types'
import { useDisplay } from 'vuetify'
const { mdAndUp, mobile } = useDisplay()

defineProps<{ toDisplay: TDataToDisplay }>()

</script>
