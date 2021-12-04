<template>
	<v-app container--fluid fill-height class='ma-0 pa-0 vh-fix' id='leafcast'>
		<v-main>
			<v-container
				class='fill-height'
				fluid
			>
				<v-row
					align='center'
					justify='center'
				>
					<v-col cols='12' sm='11' lg='8' xl='6' no-gutters class='ma-0 pa-0 px-1'>
						<v-card transition='fade-transition' class='pb-2 elevation-0 ma-0 pa-0' color='primary'>
							<app-toolbar />
							<v-card-text class=''>
								<v-fade-transition group hide-on-leave>
									<router-view key='a' />
								</v-fade-transition>
							</v-card-text>
						</v-card>
					</v-col>
				</v-row>
			</v-container>
		
		</v-main>
	
		<app-snackbar />
		<app-footer />
	</v-app>
</template>

<script lang='ts'>
import Vue from 'vue';
import { loadingModule, userModule } from '@/store';
import { mapStores } from 'pinia';
import { snackSuccess } from '@/services/snack';
import debounce from 'lodash/debounce';
import Footer from '@/components/Footer.vue';
import Snackbar from '@/components/Snackbar.vue';
import Toolbar from '@/components/Toolbar.vue';

export default Vue.extend({
	name: 'leafcast-app',

	beforeCreate () {
		window.addEventListener('beforeinstallprompt', (e) => {
			e.preventDefault();
		});
	},
	
	async beforeDestroy () {
		document.removeEventListener('updateEvent', this.appUpdate);
	},

	components: {
		appFooter: Footer,
		appSnackbar: Snackbar,
		appToolbar: Toolbar,
	},

	computed: {
		...mapStores(loadingModule, userModule),

		authenticated (): boolean {
			return this.userStore.authenticated;
		},
		loading: {
			get (): boolean {
				return this.loadingStore.loading;
			},
			set (b: boolean): void {
				this.loadingStore.set_loading(b);
			}
		},
	},

	async created () {
		document.addEventListener('updateEvent', this.appUpdate);
	},

	data: () => ({
		isHidden: false,
		logoutTimeout: 0,
	}),

	metaInfo: {
		titleTemplate: (titleChunk): string => titleChunk ? `Leafcast - ${titleChunk}` : 'Leafcast',

		meta: [
			{ name: 'description', content: `Leafcast - pi plants` }
		],
		link: [
			{ rel: 'canonical', href: `https://plants.mrjackwills.com` }
		]
	},
	
	methods: {
		/**
		 ** Show snack bar and reload, executed from service worker, reload page after 5 seconds
		 */
		appUpdate (): void {
			snackSuccess({ message: 'downloading updates', loading: true, timeout: 4500, icon: '' });
			window.setTimeout(() => location.reload(), 5000);
		},
		
		setViewHeight (): void {
			const vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty('--vh', `${vh}px`);
		},

		visibilityChange (_e: Event) {
			this.isHidden = document.hidden;
			if (this.isHidden) {
				this.logoutTimeout = setTimeout(() => {
					this.logout();
				}, 1000 * 60 * 7.5);
			} else {
				if (!this.userStore.authenticated) this.logout('');
				clearTimeout(this.logoutTimeout);
				this.logoutTimeout = 0;
			}
		},

		logout (message = 'you have been logged out'): void {
			this.userStore.logout(message);
		}

	},
	
	mounted () {
		this.setViewHeight();

		document.addEventListener('visibilitychange', this.visibilityChange);

		const debouncedSetHeight = debounce(this.setViewHeight, 50);

		window.addEventListener('resize', debouncedSetHeight);

		this.$once('destroyed', () => {
			window.removeEventListener('resize', debouncedSetHeight);
		});
	},
});
</script>

<style scoped lang="scss">
.v-sheet.v-card.v-sheet {
	border-radius: 3rem;
}

.vh-fix ::v-deep .v-application--wrap {
	min-height: 100vh;
	min-height: calc(var(--vh, 100vh) * 100);
}
</style>