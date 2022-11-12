<template>
	<section>
		<v-toolbar
			:height='toolbarHeight'
			color='secondary'
			id='toolbar'
			dark
			flat
			app
		>
			<v-img src='@/assets/logo.svg' class='ml-5 mr-2' :max-width='logoWidth' />
			<v-row align='center' justify='start' no-gutters class='pa-0 ma-0'>
				<v-col cols='auto' class='unselectable' >
					<span class='text-h4 text-offwhite'>Leafcast</span>
				</v-col>
				<v-spacer />
				<v-col
					v-if='authenticated && init'
					class='mr-5'
					cols='auto'
				>
					<v-icon
						:icon='icon'
						:size='mdAndUp?"large":"default"'
						color='offwhite'
					/>
				</v-col>
			</v-row>
	
		</v-toolbar>
		<v-progress-linear
			:indeterminate='loading'
			bg-color='primary'
			color='offwhite'
			absolute
			bottom
		/>

	</section>
</template>

<script setup lang='ts'>

import { mdiWifiArrowUpDown, mdiWifiStrengthAlertOutline } from '@mdi/js';
import { useDisplay } from 'vuetify';
const { mdAndUp, xs } = useDisplay();

const [ loadingStore, piStatusStore, userStore ]= [ loadingModule(), piStatusModule(), userModule() ];

const authenticated = computed((): boolean => {
	return userStore.authenticated;
});
const icon = computed((): string => {
	return piOnline.value ? mdiWifiArrowUpDown : mdiWifiStrengthAlertOutline ;
});
const init = computed((): boolean => {
	return piStatusStore.init;
});
const loading = computed((): boolean => {
	return loadingStore.loading;
});
const logoWidth = computed(():string => {
	return mdAndUp.value ? '55px' : '40px';
});
const piOnline = computed(():boolean => {
	return piStatusStore.online;
});
const toolbarHeight = computed((): string => {
	return xs.value ? '56' : '70';
});

</script>

<style scoped>
#toolbar {
	border-radius: 3rem 3rem 0 0;
}
</style>