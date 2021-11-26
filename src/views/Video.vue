<template>
	<section class='fill-height'>
		<template>
			<section>
				<v-row justify='center' align='center' no-gutters>
					<v-col cols='auto' sm='11' lg='6' class='parent'>
						<video width='100%' class='main-image' :class='{"image-border" : !isFullScreen }' controls :key='videoName'>
							<source :src='videoUrl' type='video/mp4'>
							Your browser does not support the video tag.
						</video>
						<v-img src='@/assets/watermark.png' class='watermark' contain />
					</v-col>
				</v-row>
				<v-row justify='center' align='center' no-gutters>

					<v-col cols='auto' class='ma-0 pa-0'>

						<v-btn
							@click='goHome'
							class=' fab-fix elevation-0 mr-2'
							color='lip'
							dark
							rounded
							small
						>
							<v-row align='center' justify='space-around' class='ma-0 pa-0'>
								<v-col cols='auto' class='ma-0 pa-0'>
									<v-icon class='mr-1'>{{ mdiHome }}</v-icon>
								</v-col>
								<v-col cols='auto' class='ma-0 pa-0' id='pi-info'>
									go home
								</v-col>
							</v-row>

						</v-btn>

						<v-btn
							@click='switchVideo'
							class=' fab-fix elevation-0 ml-2'
							color='serious'
							dark
							rounded
							small
						>
							<v-row align='center' justify='space-around' class='ma-0 pa-0'>
								<v-col cols='auto' class='ma-0 pa-0'>
									<v-icon class='mr-1'>{{ mdiVideoSwitch }}</v-icon>
								</v-col>
								<v-col cols='auto' class='ma-0 pa-0' id='pi-info'>
									switch video
								</v-col>
							</v-row>

						</v-btn>
					
					</v-col>
				</v-row>
				<v-row justify='center' align='center' no-gutters>

					<v-col cols='auto' class='ma-0 pa-0 white--text'>
						current video: 	{{ videoName }}
					</v-col>
				</v-row>
			</section>
		</template>
	</section>
</template>

<script lang='ts'>
import Vue from 'vue';

import { MetaInfo } from 'vue-meta';
import { mdiHome, mdiVideoSwitch } from '@mdi/js';
import { TVideoName } from '../types';

export default Vue.extend({
	name: 'video-view',

	async beforeDestroy () {
		document.removeEventListener('onfullscreenchange', this.fullScreenHandler);
	},

	computed: {
		videoUrl (): string {
			return `${this.baseUrl}${this.videoName}.mp4`;
		}
	},

	data: () => ({
		pageTitle: 'Video',
		videoName: 'basil' as TVideoName,
		baseUrl: 'https://plants.mrjackwills.com/video/',
		mdiHome,
		mdiVideoSwitch,
		init: false,
		isFullScreen: false,
	}),

	methods: {
		goHome () :void {
			this.$router.push('/');
		},
		switchVideo (): void {
			this.videoName = this.videoName === 'basil' ? 'garden' : 'basil';
		},
		fullScreenHandler (): void {
			this.isFullScreen = !window.screenTop && !window.screenY;
		}
	},

	metaInfo (): MetaInfo {
		return {
			title: this.pageTitle
		};
	},

	mounted () {
		document.onfullscreenchange = (_event: Event): void => {
			this.fullScreenHandler();
		};
	},

});
</script>

<style scoped>
.image-border{
	border-radius: 0rem 6rem 0 6rem;
	border: 4px solid #ffeecb
}

.parent {
	position: relative;
	top: 0;
	left: 0;
}

.watermark {
	position: absolute;
	top: 6px;
	left: 6px;
	max-width: 50%;
	z-index: 2;
}

.main-image {
	z-index: 1;
}
</style>