<template>
	<l-tooltip
		:="attrs"
		:options="tooltipOptions"
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
	import { computed, useAttrs, useSlots } from 'vue';
	import { LTooltip } from '@vue-leaflet/vue-leaflet';
	import { TooltipOptions } from 'leaflet';

	const props = defineProps<{
		permanent?: boolean;
		options?: TooltipOptions;
	}>();

	const attrs = useAttrs();
	const slots = useSlots();

	const tooltipOptions = computed(() => ({
		offset: [0, -17],
		permanent: props.permanent,
		...(props.options || {}),
	}));
</script>

<style lang="scss" scoped></style>
