<template>
	<l-icon
		:="attrs"
		:icon-anchor="[7, 35]"
		:icon-size="[14, 35]"
		:icon-url="TWT"
	>
		<template
			#[slot]
			v-for="(slot, sIdx) in Object.keys(slots)"
			:key="sIdx"
		>
			<slot :name="slot"></slot>
		</template>
	</l-icon>
</template>

<script lang="ts" setup>
	import { useAttrs, useSlots } from 'vue';
	import { LIcon } from '@vue-leaflet/vue-leaflet';
	import TWT from '@/assets/images/twt.svg';

	const attrs = useAttrs();
	const slots = useSlots();
</script>

<style lang="scss" scoped></style>
