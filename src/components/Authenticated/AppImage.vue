<template>
	<v-row justify='center' align='center' no-gutters>
		<v-col cols='auto' class='parent' width>
			<v-img :src='image' class='image-border main-image' width='650px'/>
			<v-img src='@/assets/watermark.png' class='watermark' width='100%'/>
		</v-col>
	</v-row>
</template>

<script setup lang='ts'>

const imageStore = imageModule();

const image = computed((): string => {
	return imageStore.get_image;
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
	bottom: 0;
	right: 0;
	max-width: 50%;
	z-index: 2;
}

.main-image {
	z-index: 1;
}
</style>