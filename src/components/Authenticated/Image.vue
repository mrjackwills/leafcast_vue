<template>
	<v-row justify='center' align='center' no-gutters>
		<v-col cols='auto' class='parent' width>
			<!-- <v-img v-if='!piOnline' src='@/assets/cached.png' class='cached' contain /> -->
			<v-img :src='image' contain class='image-border main-image' width='650px'/>
			<v-img src='@/assets/watermark.png' class='watermark' contain />
		</v-col>
	</v-row>
</template>

<script lang='ts'>

import Vue from 'vue';
import { ImageModule } from '@/store';

export default Vue.extend({
	name: 'image-component',
	computed: {
		image () : string {
			return ImageModule.image;
		},
		// piOnline () :boolean {
		// 	return PiStatusModule.online;
		// },
	},

	data: () => ({
		piTimeInterval: 0,
		updateInterval: 0,
		pingInterval: 0,
		countdown: 60,
		init: false,
	}),
	
});
</script>

<style scoped>
.image-border{
	border-radius: 0rem 8rem 0 8rem;
	border: 4px solid #ffeecb
}

.parent {
	position: relative;
	top: 0;
	left: 0;
}

.watermark {
	position: absolute;
	bottom: 0;
	right: 0;
	max-width: 50%;
	z-index: 2;
}

/* .cached {
	position: absolute;
	top: 0;
	left: 0;
	max-width: 50%;
	z-index: 2;
} */

.main-image {
	z-index: 1;
}
</style>