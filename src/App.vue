<template>
	<v-app container--fluid class='ma-0 pa-0 vh-fix full-height' id='leafcast'>
		<v-main class='full-height'>
			<v-container class='fill-height'
				fluid
			>
				<!-- class='full-height' -->
				<!-- fluid -->
				<!-- app -->
				<!-- > -->
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
		
			<AppFooter />
		</v-main>
		
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
		timeout: 4500,
	});
	window.setTimeout(() => updateServiceWorker(), 5000);
	
};

// name: 'leafcast-app',

// const [ loadingStore, userStore ] = [ loadingModule(), userModule() ];
const userStore = userModule() ;
onMounted(() => {
	window.addEventListener('beforeinstallprompt', (e) => {
		e.preventDefault();
	});
	document.addEventListener('visibilitychange', visibilityChange);
});

// const authenticated = computed((): boolean => {
// 	return userStore.authenticated;
// });
// const loading = computed({
// 	get (): boolean {
// 		return loadingStore.loading;
// 	},
// 	set (b: boolean): void {
// 		loadingStore.set_loading(b);
// 	}
// });

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

.vh-fix :v-deep .v-application--wrap {
	height: 100vh;
	/* min-height: calc(var(--vh, 100vh) * 100); */
}

#main_card {
	// border-radius: 1rem;
	// #toolbar {
	border-radius: 3rem;
// }
}

</style>