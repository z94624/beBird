<template>
	<NumberAnimation
		ref="visitorsNumberAnimationRef"
		:="attrs"
		:duration="3"
		:format="(val: number) => val.toFixed()"
		:from="0"
		autoplay
		easing="easeOutCubic"
	/>
</template>

<script lang="ts" setup>
	import { ref, useAttrs } from 'vue';
	import NumberAnimation from 'vue-number-animation';

	const attrs = useAttrs();

	const visitorsNumberAnimationRef = ref();

	defineExpose({ visitorsNumberAnimationRef });
</script>

<style lang="scss" scoped></style>
