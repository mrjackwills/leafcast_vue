<template>
	<v-row class='my-1 ma-0 pa-0' align='center' justify='center' no-gutters>
		<v-col :cols='`${cols}`' class='ma-0 pa-0'>
			<v-divider dark />
		</v-col>
	</v-row>
</template>

<script lang='ts'>

import Vue from 'vue';

export default Vue.extend({
	name: 'divider-component',
	props: {
		cols: {
			type: Number,
			default: 12
		}
	}
});
</script>