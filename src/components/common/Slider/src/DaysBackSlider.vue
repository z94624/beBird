<template>
	<BaseSlider
		:="attrs"
		:max="max"
		:min="min"
		:reverse="reverse"
	>
		<template
			#[slot]
			v-for="(slot, sIdx) in Object.keys(slots)"
			:key="sIdx"
		>
			<slot :name="slot"></slot>
		</template>
	</BaseSlider>
</template>

<script lang="ts" setup>
	import { useAttrs, useSlots } from 'vue';

	const props = withDefaults(
		defineProps<{
			reverse: boolean;
			max: number;
			min: number;
		}>(),
		{
			reverse: true,
			max: 30,
			min: 1,
		}
	);

	const attrs = useAttrs();
	const slots = useSlots();
</script>

<style lang="scss" scoped></style>
