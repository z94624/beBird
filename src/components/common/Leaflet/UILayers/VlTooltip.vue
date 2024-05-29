<template>
	<l-tooltip
		:options="{
			offset: [0, -17],
			permanent,
		}"
	>
		<slot name="default"></slot>
	</l-tooltip>
</template>

<script lang="ts" setup>
	import { LTooltip } from '@vue-leaflet/vue-leaflet';

	const props = defineProps<{
		permanent?: boolean;
	}>();
</script>

<style lang="scss" scoped></style>
