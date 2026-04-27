<template>
	<v-row v-if='image' class='align-center justify-center'>
		<v-col class='parent' cols='auto' width>
			<v-img class='image-border main-image' cover :src='image' :width='image_width' />
			<v-img class='watermark' src='@/assets/watermark.png' width='100%' />
		</v-col>
	</v-row>
</template>

<script setup lang='ts'>
import { useDisplay } from 'vuetify'
const { width } = useDisplay()

const image_width = computed((): string => {
	return width.value > 750 ? '650' : `${width.value * 0.8}`
})
const imageStore = imageModule()

const image = computed(() => imageStore.get_image)

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
