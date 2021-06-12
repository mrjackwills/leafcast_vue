<template>

	<v-row justify='center' align='center' class='' no-gutters v-intersect='onIntersect'>
		<v-col cols='12' md='9' lg='6' class='text-center white--text text--body-1'>

			<section v-for='(item, index) in piInfo' :key='index'>

				<v-row justify='start' align='center' class='' no-gutters>
					<v-col cols='auto' class='mr-2'>
						<v-icon dense color='white' >{{ item.icon }}</v-icon>
					</v-col>
					<v-col cols='auto'>
						<span class='white--text mr-1'>{{ item.text }}:</span> <span class='secondary--text'>{{ item.value }}</span>  <span v-if='item.extra' class='offwhite--text'>{{ item.extra }}</span>
					</v-col>
				</v-row>

				<app-divider v-if='index + 1 !== piInfo.length'/>
			
			</section>
		</v-col>

		<v-col cols='12' class='ma-0 pa-0' id='update-button'>

			<v-row align='center' justify='center' class='ma-0 pa-0'>

				<v-col cols='auto' class='ma-0 pa-0'>

					<v-btn
						@click='refresh'
						:disabled='loading'
						class=' fab-fix elevation-0'
						color='serious'
						dark
						rounded
						small
					>
						<v-row align='center' justify='space-around' class='ma-0 pa-0'>
							<v-col cols='auto' class='ma-0 pa-0'>
								<v-icon class='mr-1'>{{ mdiCameraFlip }}</v-icon>
							</v-col>
							<v-col cols='auto' class='ma-0 pa-0' id='pi-info'>
								update
							</v-col>
						</v-row>

					</v-btn>
				</v-col>
			</v-row>
		</v-col>
	</v-row>
</template>

<script lang='ts'>

import Vue from 'vue';
import { PiStatusModule, LoadingModule } from '@/store';
import { convert_bytes } from '@/vanillaTS/convertBytes';
import { mdiAlertCircleOutline, mdiSourceBranch, mdiLanConnect, mdiNodejs, mdiDesktopClassic, mdiCameraFlip } from '@mdi/js';
import { secondsToText } from '@/vanillaTS/secondsToText';
import Divider from '@/components/Divider.vue';

export default Vue.extend({
	name: 'pi-info-component',

	beforeDestroy () {
		clearTimeout(this.goToTimeout);
	},

	components: {
		appDivider: Divider,
	},

	computed: {
		internalIp () :string|undefined {
			return PiStatusModule.internalIp;
		},
		loading (): boolean {
			return LoadingModule.loading;
		},
		piNodeUptime () :number|undefined {
			return PiStatusModule.piNodeUptime;
		},
		piUptime () :number|undefined {
			return PiStatusModule.piUptime;
		},
		piOnline () :boolean {
			return PiStatusModule.online;
		},
		piVersion ():string|undefined {
			return PiStatusModule.piVersion;
		},
		piInfo (): Array<{icon: string, text: string, value: string, extra?: string}> {
			const cached = this.piOnline? `` : ` - cached`;
			const output = [
				{
					icon: mdiSourceBranch,
					text: 'pi software version',
					value: this.piVersion??''
				},
				{
					icon: mdiLanConnect,
					text: `internal ip`,
					value: this.internalIp??'',
					extra: cached
				},
			];
			if (this.piOnline) {
				output.push(

					{
						icon: mdiDesktopClassic,
						text: 'pi uptime',
						value: secondsToText(this.piUptime? this.piUptime*1000: 0)
					},
					{
						icon: mdiNodejs,
						text: 'node uptime',
						value: secondsToText(this.piNodeUptime? this.piNodeUptime*1000:0)
					});
			}
			return output;
		}
	},

	data: () => ({
		goToTimeout: 0,
		mdiAlertCircleOutline,
		mdiCameraFlip,
		isIntersecting: false
	}),

	methods: {
		convert_bytes (amount: string|number):string {
			const converted = convert_bytes(amount);
			return `${converted.total} ${converted.unit}`;
		},
		onIntersect (entries: Array<IntersectionObserverEntry>, _observer: IntersectionObserver): void {
			this.isIntersecting = !!entries[0]?.isIntersecting;
		},
		refresh ():void {
			if (this.loading) return;
			this.$emit('refresh');
		}
	},

	watch: {
		isIntersecting (i) {
			if (!i) return;
			this.goToTimeout = window.setTimeout(() => {
				this.$vuetify.goTo(`#footer`, { duration: 50 });
			}, 75);
			
		}
	}
});
</script>

<style>
</style>