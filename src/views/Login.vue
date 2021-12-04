<template>
	<section>
		<v-card-text>
			<v-row align='center' justify='center' class='ma-0 pa-0'>
				<v-col cols='12' md='9' lg='6' class='ma-0 pa-0'>
					<v-form
						v-on:submit.prevent
						method='post'
					>
						<v-text-field
							v-model='password'
							@click:append='appendClick'
							@keydown.enter='login'
							:append-icon='appendIcon'
							:disabled='loading'
							:prepend-icon='mdiLock'
							:type='fieldType'
							autocomplete='password'
							id='password'
							label='password'
							dark
						/>
					</v-form>
				</v-col>
			</v-row>
		</v-card-text>
		<v-card-actions>
			<v-row align='center' justify='center' class='ma-0 pa-0'>
				<v-col cols='auto' class='ma-0 pa-0'>
					<v-btn
						@click='login'
						:disabled='loading|| !password'
						class='elevation-0'
						color='secondary'
						rounded
					>
						login
				
					</v-btn>
				</v-col>
			</v-row>
		</v-card-actions>
	</section>
</template>

<script lang='ts'>
import Vue from 'vue';

import { axiosRequests } from '@/services/axios';
import { loadingModule } from '@/store';
import { mapStores } from 'pinia';
import { mdiEye, mdiEyeOff, mdiLock } from '@mdi/js';
import { MetaInfo } from 'vue-meta';
import { snackReset } from '@/services/snack';

export default Vue.extend({
	name: 'login-view',

	computed: {
		...mapStores(loadingModule),
		appendIcon (): string {
			return this.password ? this.passwordVisible ? mdiEyeOff: mdiEye : '';
		},
		fieldType (): string {
			return this.passwordVisible ? 'text' : 'password';
		},
		loading: {
			get: function (): boolean {
				return this.loadingStore.loading;
			},
			set: function (b: boolean): void {
				this.loadingStore.set_loading(b);
			}
		},
	},

	data: () => ({
		mdiLock,
		password: '',
		passwordVisible: false,
		pageTitle: 'login'
	}),

	metaInfo (): MetaInfo {
		return {
			title: this.pageTitle
		};
	},

	methods: {
		appendClick (): void {
			if (this.loading) return;
			this.passwordVisible = !this.passwordVisible;
		},
		
		async login (): Promise<void> {
			if (!this.password) return;
			this.passwordVisible = false;
			this.loading = true;
			const response = await axiosRequests.wsAuth_post(this.password);
			this.password = '';
			this.loading = false;
			if (response) {
				snackReset();
				this.$router.push('/');
			}
		}
	},

});
</script>