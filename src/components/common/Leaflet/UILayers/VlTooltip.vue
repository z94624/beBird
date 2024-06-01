<template>
	<l-tooltip
		:="attrs"
		:options="{
			offset: [0, -17],
			permanent,
		}"
	>
		<template
			#[slot]
			v-for="(slot, sIdx) in Object.keys(slots)"
			:key="sIdx"
		>
			<slot :name="slot"></slot>
		</template>
	</l-tooltip>
</template>

<script lang="ts" setup>
	import { useAttrs, useSlots } from 'vue';
	import { LTooltip } from '@vue-leaflet/vue-leaflet';

	const props = defineProps<{
		permanent?: boolean;
	}>();

	const attrs = useAttrs();
	const slots = useSlots();
</script>

<style lang="scss" scoped></style>
