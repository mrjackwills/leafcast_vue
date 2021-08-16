<template>
	<v-snackbar
		v-model='visible'
		timeout='-1'
	>
		<v-row justify='center' align='center' no-gutters class='ma-0 pa-0 unselectable'>
			<v-col v-if='icon' cols='auto' class=''>
				<v-icon color='danger'>{{ icon }}</v-icon>
			</v-col>
			<v-col v-if='loading' cols='auto' class=''>
				<v-progress-circular
					indeterminate
					:width='3'
					:size='18'
					color='white'
				/>
			</v-col>
			<v-col cols='auto' class='mx-3 ma-0 pa-0'>
				{{ message }}
			</v-col>
		</v-row>
	</v-snackbar>

</template>

<script lang ='ts'>
import Vue from 'vue';
import { su, nu } from '@/types';
import { SnackModule } from '@/store';

export default Vue.extend({
	name: 'snackbar-component',

	computed: {
		message: {
			get (): su {
				return SnackModule.message;
			},
			set (s: su): void {
				SnackModule.dispatch_message(s);
			}
		},
		icon (): su {
			return SnackModule.icon;
		},
		loading: {
			get (): boolean {
				return SnackModule.loading;
			},
			set (b: boolean): void {
				SnackModule.dispatch_loading(b);
			}
		},
		snackTimeout: {
			get (): nu {
				return SnackModule.timeout;
			},
			set (nu: nu): void {
				SnackModule.dispatch_timeout(nu);
			}
		},
		visible: {
			get (): boolean {
				return SnackModule.visible;
			},
			set (b: boolean): void {
				SnackModule.dispatch_visible(b);
			}
		},
	},

	data: () => ({
		timeout: 0
	}),

	methods: {
		closeSnackbar (): void {
			this.visible = false;
			SnackModule.dispatch_reset();
			clearTimeout(this.timeout);
			this.timeout = 0;
		}
	},
	
	watch: {
		visible (i): void {
			if (i && this.snackTimeout) this.timeout = window.setTimeout(() => {
				this.closeSnackbar();
			}, this.snackTimeout);
		}
	}
});
</script>