<template>
	<v-row justify='center' align='center' no-gutters v-if='image'>
		<v-col cols='auto' class='parent' width>
			<v-img class='image-border main-image' :src='image' cover :width='image_width' />
			<v-img src='@/assets/watermark.png' class='watermark' width='100%' />
		</v-col>
	</v-row>
</template>

<script setup lang='ts'>
import { useDisplay } from 'vuetify';
const { width } = useDisplay();

const image_width = computed((): string => {
	if (width.value > 750) {
		return '650';
	} else {
		return `${width.value * .80}`;
	}
});
const imageStore = imageModule();

const image = computed(() => imageStore.get_image);

</script>

<style scoped>
.image-border {
	border-radius: 0rem 6rem 0 6rem;
	border: 4px solid #ffeecb
}

.parent {
	position: relative;
	inset: 0 auto auto 0;
}

.watermark {
	position: absolute;
	inset: auto 0 0 auto;
	max-width: 50%;
	z-index: 2;
}

.main-image {
	z-index: 1;
}
</style>