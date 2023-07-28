<template>
	<v-col cols='11' md='10' class='text-center text-white text-body-1 mt-2'>

		<section v-for='(row, index) in toDisplay' :key='index'>

			<v-row justify='space-between' align='center' class='' no-gutters>

				<v-col v-for='(item, rowIndex) in row' :key='rowIndex' cols='12' md='5' :class='{ "ml-1" : rowIndex === 1 && mdAndUp }'>

					<v-row justify='space-between' align='center' no-gutters>

						<v-col cols='auto' class='ma-0 pa-0 unselectable'>
							<v-icon density='compact' color='white' class='mr-1' :size='mobile?"small":"default"'>{{ item.icon }}</v-icon>
							<span class='text-white'>{{ item.text }}:</span>
						</v-col>

						<v-col cols='auto' class='ma-0 pa-0' :class='{"mr-1" : rowIndex === 0 && mdAndUp}' >
							<span class='text-secondary mono-numbers' :class='{"unselectable": item.text !== "internal ip"}' >{{ item.value }}</span>
							<span v-if='item.extra' class='text-offwhite ml-2'>{{ item.extra }}</span>
						</v-col>
						
					</v-row>

					<app-divider class='hidden-md-and-up' v-if='rowIndex === 0 || index !== toDisplay.length -1' />

				</v-col>

			</v-row>
			
			<AppDivider v-if='index + 1 !== toDisplay.length' class='hidden-sm-and-down' />

		</section>
	</v-col>
</template>

<script setup lang="ts">

import type { TDataToDisplay } from '@/types';
import { useDisplay } from 'vuetify';
const { mdAndUp, mobile } = useDisplay();

defineProps<{
	toDisplay: TDataToDisplay,
}>();

</script>