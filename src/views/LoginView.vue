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
							@click:append-inner='appendClick'
							@keydown.enter='login'
							:append-inner-icon='appendIcon'
							:disabled='loading'
							:prepend-inner-icon='mdiLock'
							:type='fieldType'
							autocomplete='password'
							id='password'
							label='password'
							variant='outlined'
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
						:variant='!password?"outlined":"flat"'
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

<script setup lang='ts'>

import { axiosRequests } from '@/services/axios';
import { mdiEye, mdiEyeOff, mdiLock } from '@mdi/js';
import { snackReset } from '@/services/snack';
import { useRouter } from 'vue-router';
import { FrontendRoutes } from '@/types/const_routes';

const router = useRouter();

const loadingStore = loadingModule();

const appendIcon = computed((): string => {
	return passwordVisible.value ? mdiEyeOff : mdiEye;
});
const fieldType = computed((): string => {
	return passwordVisible.value ? 'text' : 'password';
});
const loading = computed({
	get (): boolean {
		return loadingStore.loading;
	},
	set (b: boolean): void {
		loadingStore.set_loading(b);
	}
});

const password = ref('');
const passwordVisible = ref(false);

const appendClick = (): void => {
	if (loading.value) return;
	passwordVisible.value = !passwordVisible.value;
};
		
const login = async (): Promise<void> => {
	if (!password.value) return;
	passwordVisible.value = false;
	loading.value = true;
	const response = await axiosRequests.wsAuth_post(password.value);
	 
	password.value = '';
	loading.value = false;
	if (response) {
		snackReset();
		router.push(FrontendRoutes.BASE);
	}
};

</script>