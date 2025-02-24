<template>
	<v-row class='my-1 ma-0 pa-0' align='center' justify='center' no-gutters>
		<v-col :cols='`${cols}`' class='ma-0 pa-0'>
			<v-divider  color='offwhite' class='divider'/>
		</v-col>
	</v-row>
</template>

<script setup lang='ts'>

withDefaults(defineProps<{ cols?: number }>(), { cols: 12 });

</script>

<style scoped>
.divider{
	opacity: .25;
}
</style>