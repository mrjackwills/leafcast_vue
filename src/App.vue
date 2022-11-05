<template>
	<v-app container--fluid class='ma-0 pa-0' id='leafcast'>
		<v-main>
			<v-container class='fill-height' fluid >
				<v-row
					align='center'
					class='fill-height'
					justify='center'
				>
					<v-col cols='12' sm='11' lg='8' xl='6' no-gutters class='ma-0 pa-0 px-1'>
						<v-card transition='fade-transition' class='pb-2 elevation-0 ma-0 pa-0' id='main_card' color='primary' round>
							<AppToolbar />
							<v-card-text class=''>
								<router-view />
							</v-card-text>
						</v-card>
					</v-col>
				</v-row>
			</v-container>
		
		</v-main>
		<AppFooter />
		
		<AppSnackbar />
	</v-app>
</template>

<script setup lang='ts'>
import { snackSuccess } from '@/services/snack';
import AppFooter from '@/components/AppFooter.vue';
import AppSnackbar from '@/components/AppSnackbar.vue';
import AppToolbar from '@/components/AppToolbar.vue';
import { useRegisterSW } from 'virtual:pwa-register/vue';
import { registerSW } from 'virtual:pwa-register';
import { useHead } from '@vueuse/head';
const { updateServiceWorker } = useRegisterSW();

const userStore = userModule() ;

if ('serviceWorker' in navigator) {
	registerSW({
		onNeedRefresh () {
			appUpdate();

		}
	});
}

const appUpdate = (): void => {
	snackSuccess({
		message: 'Downloading Updates',
		loading: true,
		timeout: 5000,
	});
	window.setTimeout(() => updateServiceWorker(), 4500);
	
};

onMounted(() => {
	window.addEventListener('beforeinstallprompt', (e) => {
		e.preventDefault();
	});
	document.addEventListener('visibilitychange', visibilityChange);
});

const isHidden = ref(false);
const logoutTimeout = ref(0);

useHead({
	title: `Leafcast`,

	meta: [
		{
			name: `description`,
			content: `Leafcast - pi based plant camera`,
		},
	],
	link: [ { rel: 'canonical', href: `https://www.plants.mrjackwills` } ],
});

const visibilityChange = (_e: Event): void => {
	isHidden.value = document.hidden;
	if (isHidden.value) {
		logoutTimeout.value = setTimeout(() => {
			logout();
		}, 1000 * 60 * 7.5);
	} else {
		if (!userStore.authenticated) logout('');
		clearTimeout(logoutTimeout.value);
		logoutTimeout.value = 0;
	}
};

const logout = (message = 'you have been logged out'): void => {
	userStore.logout(message);
};

</script>

<style scoped lang="scss">
.v-sheet.v-card.v-sheet {
	border-radius: 3rem;
}

#main_card {
	border-radius: 3rem;
}

</style>