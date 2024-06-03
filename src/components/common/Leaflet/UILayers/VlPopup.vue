<template>
	<l-popup
		:="attrs"
		:options="popupOptions"
	>
		<template
			#[slot]
			v-for="(slot, sIdx) in Object.keys(slots)"
			:key="sIdx"
		>
			<slot :name="slot"></slot>
		</template>
	</l-popup>
</template>

<script lang="ts" setup>
	import { computed, useAttrs, useSlots } from 'vue';
	import { LPopup } from '@vue-leaflet/vue-leaflet';
	import { PopupOptions } from 'leaflet';

	const props = defineProps<{
		options?: PopupOptions;
	}>();

	const attrs = useAttrs();
	const slots = useSlots();

	const popupOptions = computed(() => ({
		offset: [0, -25],
		closeButton: false,
		...(props.options || {}),
	}));
</script>

<style lang="scss" scoped></style>
