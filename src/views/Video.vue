<template>
	<section class='fill-height'>
		<v-row justify='center' align='center' class='align-center' no-gutters>

			<v-col cols='12'>
				<app-video />
			</v-col>
		</v-row>
	</section>
</template>

<script lang='ts'>
import Vue from 'vue';

import { MetaInfo } from 'vue-meta';
import Video from '@/components/Authenticated/Video.vue';

export default Vue.extend({
	name: 'vidwo-view',

	components: {
		appVideo: Video,
	},

	data: () => ({
		pageTitle: 'Video',
	}),

	metaInfo (): MetaInfo {
		return {
			title: this.pageTitle
		};
	},

});
</script>

<style>

.minh{
	min-height: 240px;
}
</style>
