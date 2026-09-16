<template>
	<l-icon
		:="attrs"
		:icon-anchor="[14, 32]"
		:icon-size="[28, 28]"
		class-name="bg-transparent border-none"
	>
		<slot>
			<GoogleMarkerIcon bg-color="primary" />
		</slot>
	</l-icon>
</template>

<script lang="ts" setup>
	import { useAttrs, useSlots } from 'vue';
	import { LIcon } from '@vue-leaflet/vue-leaflet';

	const attrs = useAttrs();
	const slots = useSlots();
</script>

<style lang="scss" scoped></style>
