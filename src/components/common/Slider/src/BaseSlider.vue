<template>
	<q-slider
		ref="sliderRef"
		:="attrs"
		style="width: -webkit-fill-available"
	>
		<template
			#[slot]
			v-for="(slot, sIdx) in Object.keys(slots)"
			:key="sIdx"
		>
			<slot :name="slot"></slot>
		</template>
	</q-slider>
</template>

<script lang="ts" setup>
	import { QSlider, QSliderProps } from 'quasar';
	import { ref, useAttrs, useSlots } from 'vue';

	const attrs: Partial<QSliderProps> = useAttrs();
	const slots: Partial<QSlider> = useSlots();

	const sliderRef = ref();

	defineExpose({ sliderRef });
</script>

<style lang="scss" scoped></style>
