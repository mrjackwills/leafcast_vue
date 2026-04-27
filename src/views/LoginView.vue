<template>
	<section>
		<v-card-text>
			<v-row class='ma-0 pa-0 align-center justify-center'>
				<v-col class='ma-0 pa-0' cols='12' lg='6' md='9'>
					<v-form
						method='post'
						@submit.prevent
					>
						<v-text-field
							id='password'
							v-model='password'
							:append-inner-icon='appendIcon'
							autocomplete='password'
							dark
							:disabled='loading'
							label='password'
							:prepend-inner-icon='mdiLock'
							:type='fieldType'
							variant='outlined'
							@click:append-inner='appendClick'
							@keydown.enter='login'
						/>
					</v-form>
				</v-col>
			</v-row>
		</v-card-text>

		<v-card-actions>
			<v-row class='ma-0 pa-0 align-center justify-center'>
				<v-col class='ma-0 pa-0' cols='auto'>
					<v-btn
						class='elevation-0'
						color='secondary'
						:disabled='loading|| !password'
						rounded
						:variant='!password?"outlined":"flat"'
						@click='login'
					>
						login
					</v-btn>
				</v-col>
			</v-row>

		</v-card-actions>
	</section>
</template>

<script setup lang='ts'>

import { mdiEye, mdiEyeOff, mdiLock } from '@mdi/js'
import { useRouter } from 'vue-router'
import { fetchRequests } from '@/services/fetch'
import { snackReset } from '@/services/snack'
import { FrontendRoutes } from '@/types/const_routes'

const router = useRouter()

const loadingStore = loadingModule()

const appendIcon = computed(() => passwordVisible.value ? mdiEyeOff : mdiEye)
const fieldType = computed(() => passwordVisible.value ? 'text' : 'password')
const loading = computed({
	get (): boolean {
		return loadingStore.loading
	},
	set (b: boolean): void {
		loadingStore.set_loading(b)
	},
})

const password = ref('')
const passwordVisible = ref(false)

function appendClick (): void {
	if (loading.value) return
	passwordVisible.value = !passwordVisible.value
}

async function login (): Promise<void> {
	if (!password.value) return
	passwordVisible.value = false
	loading.value = true
	const response = await fetchRequests.wsAuth_post(password.value)

	password.value = ''
	loading.value = false
	if (response) {
		snackReset()
		router.push(FrontendRoutes.BASE)
	}
}

</script>
