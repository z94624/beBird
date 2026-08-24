<template>
	<l-icon
		:="attrs"
		:class-name="hasDefaultSlot ? 'bg-transparent border-none' : ''"
		:icon-anchor="[14, 32]"
		:icon-size="[28, 28]"
		:icon-url="hasDefaultSlot ? undefined : TWT"
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
	import { computed, useAttrs, useSlots } from 'vue';
	import { LIcon } from '@vue-leaflet/vue-leaflet';
	import TWT from '@/assets/images/twt.svg';

	const attrs = useAttrs();
	const slots = useSlots();

	// 判斷父層是否有傳入 default slot
	const hasDefaultSlot = computed(() => !!slots.default);
</script>

<style lang="scss" scoped></style>
